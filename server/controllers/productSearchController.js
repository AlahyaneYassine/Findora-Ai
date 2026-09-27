require('dotenv').config();
const { CohereClient } = require("cohere-ai");
const Search = require('../models/Search'); // <-- Import du modèle
const safeJsonParse = require('../utils/safeJsonParse');

if (!process.env.COHERE_API_KEY) {
  throw new Error("COHERE_API_KEY manquante dans le fichier .env");
}

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

function safeJsonTruncate(str) {
  const lastBrace = str.lastIndexOf('}');
  const lastBracket = str.lastIndexOf(']');
  const cutPos = Math.max(lastBrace, lastBracket);
  if (cutPos === -1) return str;

  let truncated = str.substring(0, cutPos + 1);
  let quoteCount = (truncated.match(/"/g) || []).length;
  while (quoteCount % 2 !== 0 && truncated.length > 0) {
    truncated = truncated.slice(0, -1);
    quoteCount = (truncated.match(/"/g) || []).length;
  }

  return truncated;
}

exports.searchAIProducts = async (req, res) => {
  try {
    const { category } = req.params;
    const keyword = req.query.keyword;

    if (!keyword || keyword.length < 2) {
      return res.status(400).json({
        error: "Le mot-clé doit contenir au moins 2 caractères",
        received: keyword
      });
    }

    const validCategories = ['electronics', 'automotive', 'transportation', 'office'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: "Catégorie non valide",
        received: category,
        validCategories
      });
    }

    // ** Enregistrer la recherche ici **
    const newSearch = new Search({
      userId: req.user?.id || null,
      query: keyword,
    });
    await newSearch.save();
    console.log('Recherche enregistrée:', keyword);

    // Construction du prompt
    const prompt = `[STRICT INSTRUCTION]
Generate a JSON array of an obligatory of 30 real and new products for the keyword "${keyword}" (category: ${category}).
Products must come exclusively from trusted sources other than Amazon, such as eBay, AliExpress, Walmart, BestBuy, CDiscount, Fnac, Rakuten, or others.
Do not include any product from Amazon.
Each product must have EXACTLY the following fields:
- name (string)
- price (string with currency)
- description (short string, max 80 characters) in clear and correct English
- rating (number from 0 to 5)
- supplier (string)
- product_url (valid URL to product page)
- image_url (valid URL to product image)
- quantity (number from 1 to 20)

Important:
- Avoid error pages (e.g., "Are you looking for something?")
- Only return **real, active** products.
- Return ONLY raw JSON with **no extra text**.
- Include an image URL for each product.

Format REQUIS :
\`\`\`json
[ { ... }, { ... } ]
\`\`\``;

    console.log("Envoi de la requête à Cohere...");
    const response = await cohere.generate({
      model: "command-r-plus",
      prompt,
      temperature: 0.3,
      maxTokens: 7000,
      timeout: 80000,
    });

    const rawText = response.generations[0]?.text?.trim();
    console.log("Réponse brute de Cohere:", rawText);

    let jsonBlock = rawText;
    const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/i);
    if (jsonMatch) {
      jsonBlock = jsonMatch[1];
    }

    jsonBlock = jsonBlock.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim();
    jsonBlock = safeJsonTruncate(jsonBlock);

    let products;
    try {
      products = safeJsonParse(jsonBlock);
      if (!products || !Array.isArray(products)) {
        throw new Error("Format JSON invalide ou structure incorrecte");
      }
    } catch (err) {
      console.error("❌ Erreur de parsing JSON:", err.message);
      console.debug("Contenu JSON brut:", jsonBlock);
      throw new Error(`Format JSON invalide: ${err.message}`);
    }

    // Supprimer les doublons d'URL
    const seenUrls = new Set();
    const uniqueProducts = [];

    for (const product of products) {
      if (seenUrls.has(product.product_url)) continue;
      seenUrls.add(product.product_url);
      uniqueProducts.push(product);
    }

    const isValidProduct = (product) => {
      const invalidAmazonUrl =
        product.product_url.toLowerCase().includes("amazon") ||
        product.product_url.includes("gp/aw") ||
        product.product_url.includes("error") ||
        product.product_url.includes("ap/signin") ||
        product.product_url.includes("vous-cherchez-quelque-chose");

      return (
        product?.name &&
        product?.price &&
        product?.description &&
        !isNaN(product?.rating) &&
        typeof product.product_url === 'string' &&
        product.product_url.startsWith('http') &&
        typeof product.image_url === 'string' &&
        product.image_url.startsWith('http') &&
        !invalidAmazonUrl &&
        product.supplier.toLowerCase() !== 'amazon'
      );
    };

    const filteredProducts = uniqueProducts.filter(isValidProduct);

    const finalProducts = filteredProducts.slice(0, 100).map(product => ({
      ...product,
      rating: parseFloat(product.rating).toFixed(1),
      quantity: product.quantity || Math.floor(Math.random() * 20) + 1,
    }));

    if (finalProducts.length === 0) {
      throw new Error("Aucun produit valide trouvé dans la réponse hors Amazon");
    }

    return res.json({
      success: true,
      count: finalProducts.length,
      products: finalProducts
    });

  } catch (error) {
    console.error("[ERREUR FINALE]", error.message);

    const mockProducts = [{
      name: `${req.query.keyword || 'Produit'} (exemple)`,
      price: "99.99€",
      description: "Produit de démonstration - erreur API",
      rating: 4.0,
      supplier: "Fournisseur Démo",
      product_url: "https://www.example.com",
      image_url: "https://via.placeholder.com/150",
      quantity: 1
    }];

    return res.status(500).json({
      error: "Erreur API - Mode démo activé",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      products: mockProducts
    });
  }
};

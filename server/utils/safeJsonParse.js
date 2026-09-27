// utils/safeJsonParse.js
module.exports = function safeJsonParse(input) {
  try {
    return JSON.parse(input);
  } catch (err) {
    // Nettoyage de l'input JSON
    let fixed = input
      .replace(/,\s*[\]}]\s*$/, '')  // Enlève virgules en trop
      .replace(/\\u[\dA-F]{0,3}$/gi, '') // Séquences unicode incomplètes
      .replace(/https?:\/\/[^\s"]{500,}/g, '"https://via.placeholder.com/150"') // Supprime URL trop longues
      .trim();

    const lastBrace = fixed.lastIndexOf('}');
    if (lastBrace > -1) fixed = fixed.substring(0, lastBrace + 1);
    if (!fixed.endsWith(']')) fixed += ']';

    try {
      return JSON.parse(fixed);
    } catch (e2) {
      console.error("❌ Correction échouée:", e2.message);
      return null;
    }
  }
};

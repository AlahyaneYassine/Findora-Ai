const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// Config transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route pour envoyer une réponse
router.post("/", async (req, res) => {
  const { to, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Support MonSite" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Réponse à votre message",
      text: message,
      html: `<p>${message}</p>`
    });

    res.json({ success: true, message: "Réponse envoyée avec succès !" });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    res.status(500).json({ success: false, message: "Erreur lors de l'envoi." });
  }
});

module.exports = router;

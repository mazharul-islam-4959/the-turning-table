import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;
  let reply = "";

  if (!message) {
    return res.json({ reply: "I didn't get your message." });
  }

  if (message.toLowerCase().includes("order")) {
    reply = "Your order is being processed. Check 'My Orders' for details!";
  } else if (message.toLowerCase().includes("menu")) {
    reply =
      "Here is our menu:\nSalad\nRolls\nDesert\nSandwich\nCake\nPure Veg\nPasta\nNoodles";
  } else if (message.toLowerCase().includes("contact")) {
    reply = "You can contact us at contact@turntable.com!";
  } else {
    reply = "Sorry, I didn't understand. Please type: menu, order, contact.";
  }

  res.json({ reply });
});

export default router; // ✅ use export default here

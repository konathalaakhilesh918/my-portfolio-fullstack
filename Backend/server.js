const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ CONNECT DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// ✅ SCHEMA
const contactSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String
});

const Contact = mongoose.model("Contact", contactSchema);

// ✅ SAVE DATA
app.post("/contact", async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    const newData = await Contact.create(req.body);

    console.log("✅ Saved to DB:", newData);

    res.send("Message stored successfully");
  } catch (error) {
    console.log("❌ Error:", error);
    res.status(500).send("Error saving data");
  }
});

// ✅ CHECK DATA (VERY IMPORTANT)
app.get("/contacts", async (req, res) => {
  const data = await Contact.find();
  res.json(data);
});

// ✅ START SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
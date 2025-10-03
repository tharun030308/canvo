const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));

app.post("/save-image", (req, res) => {
  const dataURL = req.body.image;
  const base64 = dataURL.replace(/^data:image\/png;base64,/, "");
  const filePath = path.join(__dirname, "public", "canvas.png");

  fs.writeFile(filePath, base64, "base64", (err) => {
    if (err) {
      console.error("Error saving:", err);
      return res.status(500).send("Save failed");
    }
    res.send("Image saved as canvas.png");
  });
});

app.listen(3000, "0.0.0.0", () => console.log("Server running on http://0.0.0.0:3000"));
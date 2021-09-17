import fs from "fs";
import path from "path";

/**
 *
 * Get All article and add a new articles
 *
 * @param {*} req
 * @param {*} res
 */

export default function handler(req, res) {
  const filePath = path.join(
    process.cwd(),
    "pages/api/data/blog/",
    "image_to_post.json"
  );

  if (req.method === "POST") {
    const dataTransmit = req.body;

    const filePath = `${req.body.uploadDir}/${req.body.fileName}`;

    fs.mkdir(req.body.uploadDir, { recursive: true }, (err) => {
      let base64String = req.body.base64; // Not a real image
      // Remove header
      let base64Image = base64String.split(";base64,").pop();
      fs.writeFile(
        filePath,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log("File created");
        }
      );
    });

    res.status(201).json({ message: dataTransmit });
  }
}

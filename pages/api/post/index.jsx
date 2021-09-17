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
    "posts.json"
  );
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  if (req.method === "GET") {
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const reqBody = req.body;

    const newPost = {
      userID: parseInt(req.body.userID, 10),
      id: parseInt(req.body.id),
      activate: req.body.activate,
      timeStamp: req.body.timestamp,
      update_date: false,
      alt_FR: req.body.alt_FR,
      alt_EN: req.body.alt_EN,
      width: req.body.width,
      height: req.body.height,
      fileName: req.body.fineName,
      uploadDir: req.body.uploadDir,
      fr: {
        title: req.body.fr.title,
        post: req.body.fr.post,
        comment: [],
      },
      en: {
        title: req.body.en.title,
        post: req.body.en.post,
        comment: [],
      },
    };

    data[0].posts.push(newPost);
    fs.writeFileSync(filePath, JSON.stringify(data));

    //Create File

    const imagePath = `${req.body.uploadDir}/${req.body.fileName}`;

    fs.mkdir(req.body.uploadDir, { recursive: true }, (err) => {
      let base64String = req.body.base64; // Not a real image
      // Remove header
      let base64Image = base64String.split(";base64,").pop();
      fs.writeFile(
        imagePath,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log("File created");
        }
      );
    });

    res
      .status(201)
      .json({ message: "Article ajouté", result: data, console: { reqBody } });
  }
}

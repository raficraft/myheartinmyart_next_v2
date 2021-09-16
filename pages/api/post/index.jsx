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
  //Get Colllection file
  const filePath = path.join(process.cwd(), "data", "blog.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  if (req.method === "GET") {
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const timePost = new Date();

    const date_fr = `${timePost.getDate()}-${timePost.getMonth()}-${timePost.getFullYear()}`;
    const date_en = `${timePost.getMonth()}-${timePost.getDate()}-${timePost.getFullYear()}`;

    const newPost = {
      userID: parseInt(req.body.userID, 10),
      id: req.body.id,
      img_filename: req.body.img_filename,
      imageBase64: req.body.imageBase64,
      uploadDir: req.body.uploadDir,
      active: true,
      timestamp: Date.now(),
      day: timePost.getDay(),
      publish_date_fr: date_fr,
      publish_date_en: date_en,
      update_date: false,
      placeholder_img: false,
      placeholder_img_alt: "default image",
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

    data.push(newPost);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Article ajouté", result: data });
  }
}

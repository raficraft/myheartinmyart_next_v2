import fs from "fs";
import path from "path";

/**
 * Read Specifique Article and Update or delete this.
 *
 * @param {*} req
 * @param {*} res
 */

export default function handler(req, res) {

  const filePath = path.join(process.cwd(), "data", "blog.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const { pid } = req.query;
  const idKey = pid - 1;
  const currentPost = data.filter((post) => post.id === parseInt(pid));
  const timePost = new Date();

  switch (req.method) {
    case "GET":
      res.status(200).json(currentPost);

      break;

    case "PUT":
      switch (req.body.action) {
        case "update_specific":
          const newPost = {
            userID: req.body.userID,
            id: req.body.id,
            img_filename: req.body.img_filename,
            uploadDir: req.body.uploadDir,
            active: true,
            timestamp: Date.now(),
            day: timePost.getDay(),
            publish_date_fr: currentPost[0].publish_date_fr,
            publish_date_en: currentPost[0].publish_date_en,
            update_date: Date.now(),
            placeholder_img: false,
            placeholder_img_alt: "default image",
            fr: {
              title: req.body.fr.title,
              post: req.body.fr.post,
              comment: [],
            },
            en: {
              title: "",
              post: "",
              comment: [],
            },
          };

          data.splice(idKey, 1, newPost);
          fs.writeFileSync(filePath, JSON.stringify(data));

          const updatePost = data.filter((post) => post.id === parseInt(pid));
          res.status(201).json({
            error: null,
            message: "Article modifié avec succès",
            data: updatePost,
            console: {},
          });

          break;

        case "toggleLockPost":
          currentPost[0].active = !currentPost[0].active;

          data.splice(idKey, 1, currentPost[0]);
          fs.writeFileSync(filePath, JSON.stringify(data));

          const updateLockPost = data.filter(
            (post) => post.id === parseInt(pid)
          );

          res.status(201).json({
            error: null,
            message: "Article désactivé avec succès",
            data: updateLockPost,
            console: {
              currentPost: currentPost[0],
            },
          });

          break;
      }

      break;
    case "DELETE":
      //Delete article
      data.splice(idKey, 1);
      fs.writeFileSync(filePath, JSON.stringify(data));
      res.status(201).json({
        error: null,
        message: "Article supprimer avec succès",
        console: { delID: idKey, data: data },
      });

      break;
  }
}

import fs from "fs";
import path from "path";

/**
 * Read Specifique Article and Update or delete this.
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
  const { pid } = req.query;
  const currentPost = data[0].posts.filter((post) => post.id === parseInt(pid));
  const reqBody = req.body;

  switch (req.method) {
    case "GET":
      res.status(200).json(currentPost);

      break;

    case "PUT":
      switch (reqBody.action) {
        case "alterateEntrie":
          const idKey = parseInt(pid);
          const newVal = reqBody.value;
          currentPost[0][reqBody.fields] = newVal;

          data[0].posts.splice(idKey, 1, currentPost[0]);
          fs.writeFileSync(filePath, JSON.stringify(data));

          res.status(201).json({
            error: null,
            message: "Article modifié avec succès",
            console: {
              reqBody,
              idKey,
              currentPost,
              gnak: currentPost[0],
              newVal,
            },
          });

          break;

        case "repost":
          break;
      }

    case "POST":

      const reqBody = req.body;
      const currentKey = Object.keys(currentPost[0]);

      let majPost = {};

      for (const iterator of currentKey) {
        majPost[iterator] = req.body[iterator];
      }

      console.log(majPost);

      res.status(201).json({
        log: "yellow",
        post: currentPost,
        body: reqBody,
        key: currentKey,
        res: majPost,
      });
      break;

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

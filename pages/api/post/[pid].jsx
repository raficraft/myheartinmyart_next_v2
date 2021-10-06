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
            message: `Article modifié avec succès => ${reqBody.fields} :  ${newVal}`,
            newPosts: data[0].posts,
            console: {
              reqBody,
              idKey,
              currentPost,
              newVal,
            },
          });

          break;
      }

    case "POST":
      const currentKey = Object.keys(currentPost[0]);
      const idKey = parseInt(pid);

      let majPost = {};
      let reject = {};

      //Create Maj
      for (const iterator of currentKey) {
        if (reqBody[iterator]) {
          majPost[iterator] = reqBody[iterator];
        } else {
          majPost[iterator] = currentPost[0][iterator];
        }
        if (reqBody[iterator] === "" || reqBody[iterator] === "undefined") {
          reject[iterator] = reqBody[iterator];
          majPost[iterator] = currentPost[0][iterator];
        }
      }

      console.log("add this data :", majPost);

      //Maj collection
      data[0].posts.splice(idKey, 1, majPost);
      fs.writeFileSync(filePath, JSON.stringify(data));

      //Create File

      const imagePath = `${reqBody.uploadDir}/${reqBody.fileName}`;

      fs.mkdir(reqBody.uploadDir, { recursive: true }, (err) => {
        let base64String = reqBody.base64; // Not a real image

        //Vider le repertoire

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

      res.status(201).json({
        log: "yellow",
        post: currentPost[0],
        body: reqBody,
        key: currentKey,
        res: majPost,
        reject,
        bdd: data[0].posts[idKey],
        error: null,
        message: "Article Modifié avec succés",
      });

      break;

      break;
    case "DELETE":
      //Delete article
      const deleteID = parseInt(pid);
      data[0].posts.splice(deleteID, 1);

      //Rewrite ID
      const collectionLength = data[0].posts.length;

      for (let i = 0; i < collectionLength; i++) {
        const item = data[0].posts[i];
        item.id = i;
      }

      console.log("yolo", currentPost[0].uploadDir);

      //Delete Dir to have illustration image
      const deleteDir = path.join(process.cwd(), currentPost[0].uploadDir);
      fs.rmdir(deleteDir, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }

        console.log(`${deleteDir} is deleted!`);
      });

      // del Dir

      fs.writeFileSync(filePath, JSON.stringify(data));
      res.status(201).json({
        error: null,
        message: "Article supprimer avec succès",
        newPosts: data,
        console: {
          delID: deleteID,
          data: data,
        },
      });

      break;
  }
}

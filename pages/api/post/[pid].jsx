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
  console.log("he ho ", data[0].posts);
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
        // if the data key call change value
        if (reqBody[iterator]) {
          majPost[iterator] = reqBody[iterator];

          //If transmit value is empty or undefined
          // Add in reject array and apply default value
          if (reqBody[iterator] === "" || reqBody[iterator] === "undefined") {
            reject[iterator] = reqBody[iterator];
            majPost[iterator] = currentPost[0][iterator];
          }
        } else {
          //else apply original value
          majPost[iterator] = currentPost[0][iterator];
        }
      }

      console.log("add this data :", majPost);

      //Maj collection
      data[0].posts.splice(idKey, 1, majPost);
      fs.writeFileSync(filePath, JSON.stringify(data));

      //Create File
      if (reqBody.imageBase64) {
        const imagePath = path.join(
          process.cwd(),
          `${reqBody.uploadDir}/${reqBody.fileName}`
        );
        const uploadDir = path.join(process.cwd(), reqBody.uploadDir);

        fs.mkdir(uploadDir, { recursive: true }, (err) => {
          let base64String = reqBody.base64; // Not a real image

          //Vider le repertoire

          let base64Image = base64String.split(";base64,").pop();
          fs.writeFile(
            imagePath,
            base64Image,
            { encoding: "base64" },
            function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("File created");
              }
            }
          );
        });
      }

      res.status(201).json({
        log: "yellow",
        newPosts: data[0].posts,
        body: reqBody,
        key: currentKey,
        res: majPost,
        reject,
        result: data[0].posts[idKey],
        error: null,
        message: "Article Modifié avec succés",
      });
      /*
      res.status(201).json({
        log: { currentPost, body: req.body, pid: pid },
      });*/

      break;

      break;
    case "DELETE":
      //Delete article
      let dataCopy = data[0].posts;
      const collectionLength = data[0].posts.length;
      const deleteID = parseInt(pid);

      for (let i = 0; i < collectionLength; i++) {
        const x = i === 0 ? 0 : i - 1;
        const newImagePath = `/assets/blog/posts/${x}/${data[0].posts[i].imageName}`;
        const newUploadDir = `./public/assets/blog/posts/${x}`;

        if (i > deleteID) {
          //copy by ref, redifine source

          fs.rename(data[0].posts[i].uploadDir, newUploadDir, function (err) {
            if (err) {
              console.log(err);
              console.log(
                "error renamed the directory old => .",
                data[0].posts[i].uploadDir
              );
              console.log("error renamed the directory new => .", newUploadDir);
            } else {
              console.log(
                "Successfully renamed the directory old => .",
                data[0].posts[i].uploadDir
              );
              console.log(
                "Successfully renamed the directory new => .",
                newUploadDir
              );
            }
          });

          data[0].posts[i].id = x;
          data[0].posts[i].imagePath = newImagePath;
          data[0].posts[i].uploadDir = newUploadDir;
        } else if (i === deleteID) {
          fs.rename(
            data[0].posts[i].uploadDir,
            `./public/assets/blog/posts/tmp`,
            function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("Successfully renamed the directory.");
                fs.rmdir(
                  "./public/assets/blog/posts/tmp",
                  { recursive: true },
                  (err) => {
                    if (err) {
                      throw err;
                    }
                    console.log(`'./public/assets/blog/posts/tmp' is deleted!`);
                  }
                );
              }
            }
          );
        }
      }

      data[0].posts.splice(deleteID, 1);

      console.log("yolo", currentPost[0].uploadDir);

      fs.writeFileSync(filePath, JSON.stringify(data));

      res.status(201).json({
        error: null,
        message: "Article supprimer avec succès",
        newPosts: data[0].posts,
        console: {
          delID: deleteID,
          editData: dataCopy,
          srcData: data[0].posts,
        },
      });

      break;
  }
}

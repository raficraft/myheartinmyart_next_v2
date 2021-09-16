import formidable from "formidable";
import fs from "fs";
import path from "path";

/*Code adapted from source https://codesandbox.io/s/thyb0?file=/pages/api/file.js:576-590
. Who adds the upload in a dynamic uploadDir*/

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res, dir) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file, dir);
    return res.status(201).send("");
  });
};

const saveFile = async (file, dir) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`${dir}/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};

export default function handler(req, res) {
  const params = req.query;
  const uploadDir = `./public/assets/blog/posts/${parseInt(params.pid)}/`;

  if (req.method === "POST") {
    //Création du repertoire

    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      const lol = true;
      if (err) throw err;
      //Image Upload
      //  post(req, res, uploadDir);

      //Image Write
      //Buffer where are you

      fs.writeFile(
        `${dir}/${file.name}`,
        req.body.file.base64Image,
        { encoding: "base64" },
        function (err) {
          console.log("File created");
        }
      );

      res.status(200).json({
        err,
        message: "Image uploadé avec succès",
        pid: lol,
        upload: uploadDir,
      });
    });
  } else if (req.method === "PUT") {
    fs.readdir(uploadDir, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(uploadDir, file), (err) => {
          if (err) throw err;
        });

        post(req, res, uploadDir);

        res.status(200).json({
          err,
          message: "TEST YOLO",
          check: lol,
        });
      }
    });
  }
}

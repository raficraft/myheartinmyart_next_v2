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
 

   const fakePost = {
     posts: {
       id: 0,
       userID: 1,
       activate: true,
       alt_FR: "",
       alt_EN: "",
       en: { title: "kjkljkl", post: "jkljlkj" },
       fileName: "test.jpg",
       fr: { title: "jkjk oooo", post: "jklkjlkjk" },
       height: 648.4177215189874,
       imagePath: "/assets/blog/posts/0/test.jpg",
       timestamp: 1633293499255,
       uploadDir: "./public/assets/blog/posts/0",
       update_date: 1633293458256,
       width: 450,
       edited_by: false,
     },
   };

   if (req.method === "GET") {
     res.status(200).json(fakePost);
     res.status(500).json({ error: "!!!!!!!!!!!!!!!" });
   } else if (req.method === "POST") {
     const reqBody = req.body;

     const newPost = {
       id: parseInt(req.body.id),
       userID: parseInt(req.body.userID, 10),
       activate: req.body.activate,
       alt_FR: req.body.alt_FR,
       alt_EN: req.body.alt_EN,
       en: {
         title: req.body.en.title,
         post: req.body.en.post,
         comment: [],
       },
       fileName: req.body.fileName,
       fr: {
         title: req.body.fr.title,
         post: req.body.fr.post,
         comment: [],
       },
       height: req.body.height,
       imagePath: req.body.imagePath,
       timestamp: req.body.timestamp,
       uploadDir: req.body.uploadDir,
       update_date: false,
       width: req.body.width,
       edited_by: parseInt(req.body.userID, 10),
     };

     data[0].posts.push(newPost);
     fs.writeFileSync(filePath, JSON.stringify(data));

     //Create File

     const imagePath = `${req.body.uploadDir}/${req.body.fileName}`;

     fs.mkdir(req.body.uploadDir, { recursive: true }, (err) => {
       let base64String = req.body.base64; // Not a real image

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

     res
       .status(201)
       .json({ message: "Article ajouté", result: data, console: { reqBody } });
   }
}

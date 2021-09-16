import fs from "fs";
import path from "path";

/**
 *
 * Get All article and add a new articles
 *
 * @param {*} req
 * @param {*} res
 */

 const collectionIfExist = async (params) => {
   const collectionDir = params.dir;

   console.log("yolo");

   fs.mkdir(collectionDir, { recursive: true }, (err) => {
     console.log(err);

     const structure = [
       {
         collection: params.collectionName,
         timeStamp: Date.now(),
         [params.collectionName]: [],
       },
     ];
     const filePath = `${params.dir}/${params.collectionName}.json`;

     try {
       if (fs.existsSync(filePath)) {
         console.log("The file exists.");
       } else {
         fs.writeFile(filePath, JSON.stringify(structure));
       }
     } catch (err) {
       console.error(err);
     }
   });
 };

 const getCollection = async (params) => {
   const filePath = path.join(
     process.cwd(),
     `${params.dir}`,
     `${params.collectionName}.json`
   );

   const fileData = fs.readFileSync(filePath);
   const data = JSON.parse(fileData);
   return data;
 };

 export default function handler(req, res) {
   const params = {
     dir: `pages/api/data/blog`,
     collectionName: "posts",
   };

   collectionIfExist(params);
   // const data = getCollection(params);

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
     const test = process.cwd();

     const newPost = {
       userID: parseInt(req.body.userID, 10),
       id: parseInt(req.body.id),
       activate: req.body.activate,
       timeStamp: req.body.timestamp,
       update_date: false,
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

     res
       .status(201)
       .json({ message: "Article ajouté", result: data, console: { test } });
   }
 }

export const collectionIfExist = async (params) => {
  const collectionDir = params.dir;


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

/*export const getCollection = async (params) => {
  const filePath = path.join(
    process.cwd(),
    "pages/api/data/blog/",
    "posts.json"
  );
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};*/

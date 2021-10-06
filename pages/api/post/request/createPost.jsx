export default function createPost(e, fields, image, lastID) {
  e.preventDefault();


  console.log("DIANTRE !!!!! : ", lastID);
  //calculate timeStamp to publish
  const datePost = new Date();
  const timeStampByDate = datePost.getTime(fields.date.current.input.value);
  const hours = fields.hours.current.input.value * 360 * 1000;
  const minutes = fields.minutes.current.input.value * 1000;
  const timestampTopublish = timeStampByDate + hours + minutes;

  const newID = lastID;
  const inputs = {
    userID: fields.userID.current,
    activate: fields.active.current.input,
    alt_FR: fields.alt_FR.current.input,
    alt_EN: fields.alt_EN.current.input,
    fr: {
      title: fields.titleFR.current.input,
      content: fields.contentFR.current.input,
    },
    en: {
      title: fields.titleEN.current.input,
      content: fields.contentEN.current.input,
    },
  };

  console.log("controls input ", inputs.activate.checked);

  //Brut data to article collection
  const newPost = {
    id: newID,
    userID: inputs.userID.value,
    activate: inputs.activate.checked,
    alt_FR: inputs.alt_FR.value,
    alt_EN: inputs.alt_EN.value,
    base64: image.imageBase64,
    en: {
      title: inputs.en.title.value,
      post: inputs.en.content.value,
    },
    fileName: image.name,
    fr: {
      title: inputs.fr.title.value,
      post: inputs.fr.content.value,
    },
    height: image.height,
    imagePath: `/assets/blog/posts/${newID}/${image.name}`,
    timestamp: timestampTopublish,
    uploadDir: `./public/assets/blog/posts/${newID}`,
    width: image.width,
    edited_By: false,
  };

  //Call APi to add Post
  fetch("/api/post", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((r) => r.json())
    .then((result) => {
      console.log("push json", result);
      return result;
    });
}

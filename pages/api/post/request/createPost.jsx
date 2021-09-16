export default function createPost(e, fields, image, lastID) {
  console.log(e);
  console.log(image);
  console.log(image.name);
  console.log("fields : ", fields);
  console.log("hours : ", fields.hours.current.input.value);
  console.log("minutes: ", fields.minutes.current.input.value);
  e.preventDefault();

  //calculate timeStamp to publish
  const datePost = new Date();
  const timeStampByDate = datePost.getTime(fields.date.current.input.value);
  const hours = fields.hours.current.input.value * 360 * 1000;
  const minutes = fields.minutes.current.input.value * 1000;
  const timestampTopublish = timeStampByDate + hours + minutes;

  console.log("time to publish", timeStampByDate);
  console.log("time to publish", hours);
  console.log("time to publish", minutes);
  console.log("time to publish", timestampTopublish);

  const newID = lastID.size + 1;
  const inputs = {
    userID: fields.userID.current,
    activate: fields.active.current.input,
    fr: {
      title: fields.titleFR.current.input,
      content: fields.contentFR.current.input,
      image_desc: fields.image_desc_FR.current.input,
    },
    en: {
      title: fields.titleEN.current.input,
      content: fields.contentEN.current.input,
      image_desc: fields.image_desc_EN.current.input,
    },
  };

  console.log("controls input ", inputs.activate.checked);

  //Brut data to article collection
  const newPost = {
    userID: inputs.userID.value,
    id: newID,
    activate: inputs.activate.checked,
    timestamp: timestampTopublish,
    fr: {
      title: inputs.fr.title.value,
      post: inputs.fr.content.value,
    },
    en: {
      title: inputs.en.title.value,
      post: inputs.en.content.value,
    },
  };

  //Read collections Posts
  //if not exist
  //create
  //write strucutre collection
  //return collections
  //Push collection post

  //Read collections images_to_posts
  //if not exist
  //create
  //write strucutre collection
  //return collections
  //Push collections image_to_post

  /* fetch("/api/post", {
    method: "GET",
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
    });*/

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

  //Call Api to add image associate with post in disitnct library

  /*    uploadDir: `/assets/blog/posts/${newID}`,
    img_filename: image.name,
    imageBase64: image.imageBase64, */

  return null;
}

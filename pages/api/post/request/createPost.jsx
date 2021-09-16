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
    userID: fields.userID.current.value,
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

  console.log(inputs);

  const newPost = {
    userID: inputs.userID,
    id: newID,
    uploadDir: `/assets/blog/posts/${newID}`,
    img_filename: image.name,
    imageBase64: image.imageBase64,
    fr: {
      title: inputs.fr.title.value,
      post: inputs.fr.content.value,
    },
    en: {
      title: inputs.en.title.value,
      post: inputs.en.content.value,
    },
  };

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

  //OlD file uplaod
  //Remove because , i can just upload the original files and not canvas resize.
  //console.log("result Post New Blog Post", fetchPostData);
  /*
  const body = new FormData();
  body.append("file", image);

  fetch(`/api/post/file/${newID}`, {
    method: "POST",
    body,
  })
    .then((r) => r.json())
    .then((result) => {
      console.log("file", result);
    });*/
  return null;
}

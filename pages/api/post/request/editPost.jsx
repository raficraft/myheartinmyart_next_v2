export default function editPost(e, fields, image, postId) {
  e.preventDefault();

  //calculate timeStamp to publish
  const datePost = new Date();
  const timeStampByDate = datePost.getTime(fields.date.current.input.value);
  const hours = fields.hours.current.input.value * 360 * 1000;
  const minutes = fields.minutes.current.input.value * 1000;
  const timestampTopublish = timeStampByDate + hours + minutes;

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

  let newPost = {};

  //Brut data to article collection
  const majPost = {
    id: postId,
    activate: inputs.activate.checked,
    alt_FR: inputs.alt_FR.value,
    alt_EN: inputs.alt_EN.value,
    en: {
      title: inputs.en.title.value,
      post: inputs.en.content.value,
    },
    fr: {
      title: inputs.fr.title.value,
      post: inputs.fr.content.value,
    },
    timestamp: timestampTopublish,
    update_date: Date.now(),
    edited_By: inputs.userID.value,
  };

  //Image Control
  if (image.imageBase64 !== "") {
    const majImage = {
      imagePath: `/assets/blog/posts/${postId}/${image.name}`,
      base64: image.imageBase64,
      fileName: image.name,
      height: image.height,
      width: image.width,
      uploadDir: `./public/assets/blog/posts/${postId}`,
    };

    newPost = Object.assign({}, majPost, majImage);
  } else {
    newPost = majPost;
  }

  //Call APi to edit Post
  fetch(`/api/post/${postId}`, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((r) => r.json())
    .then((result) => {
      console.log("Retour API après la modification d'un article", result);
      return result;
    });
}

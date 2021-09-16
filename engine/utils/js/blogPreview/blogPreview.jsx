import image from "next/image";

//Scrip qui reçoit un fichier et le transform en obcjectURl
// PAs d'upload de fichier seulement une chaine de caractère
// https://levelup.gitconnected.com/managing-image-uploads-in-your-browser-base64-vs-objecturls-part-1-cec5ee9af7be

export default function blogPreview(sourceFile, canvasRef, setUpload) {
  console.log("ref", canvasRef);
  const imageSrc = sourceFile;

  //ctx source
  const source = canvasRef.source.current;
  const ctxSrc = source.getContext("2d");
  //ctx output
  const canvasResize = canvasRef.canvas.current;
  const ctx = canvasResize.getContext("2d");

  const sourceSize = {
    width: canvasRef.source.current.clientWidth,
    height: canvasRef.source.current.clientHeight,
    axeX:
      !canvasRef.resize_axeX.current || canvasRef.resize_axeX.current === null
        ? 0
        : parseInt(canvasRef.resize_axeX.current.input.value),
    axeY:
      !canvasRef.resize_axeY.current || canvasRef.resize_axeY.current === null
        ? 0
        : parseInt(canvasRef.resize_axeY.current.input.value),
  };

  const outputCanvasSize = {
    width: canvasRef.canvas.current.clientWidth,
    height: canvasRef.canvas.current.clientHeight,
    ratio:
      canvasRef.canvas.current.clientWidth /
      canvasRef.canvas.current.clientHeight,
  };
  console.log("sourceSize info ", sourceSize);

  const imgSrc = new Image();
  imgSrc.src = URL.createObjectURL(imageSrc);

  //clear
  ctx.clearRect(0, 0, canvasResize.width, canvasResize.height);
  ctxSrc.clearRect(0, 0, sourceSize.width, sourceSize.height);

  //Draw image for resize preview

  const img = new Image();
  img.src = URL.createObjectURL(imageSrc);
  let ratio = 0;

  img.onload = () => {
    // console.log("width", img.naturalWidth);

    //calculate original source ratio
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    //Original Image ratio
    ratio = width / height;

    const ratioMaxForPreview = height / sourceSize.height;
    const otherRatio = width / sourceSize.width;

    let maxWidth = 0;
    let maxHeight = 0;
    let previewAxisX = 0;
    let previewAxisY = 0;

    console.log("bordel de queue", ratio);

    if (ratio < 1) {
      // console.log("image haute");

      maxWidth = width / ratioMaxForPreview;
      maxHeight = sourceSize.height;
      previewAxisX = (sourceSize.width - maxWidth) / 2;
    } else {
      // console.log("image Large");

      maxWidth = sourceSize.width;
      maxHeight = height / otherRatio;
      previewAxisY = (sourceSize.height - maxHeight) / 2;
    }

    //Construct source image preview
    ctxSrc.drawImage(img, previewAxisX, previewAxisY, maxWidth, maxHeight);

    //Construct image output for upload

    if (ratio < 1.5) {
      maxWidth = outputCanvasSize.width;
      maxHeight = outputCanvasSize.width / ratio;
      // console.log(ratio, maxHeight);
    } else {
      ratio = height / width;
      maxWidth = outputCanvasSize.height / ratio;
      maxHeight = outputCanvasSize.height;
    }

    //    console.log("dimension de limage à upload", maxWidth, maxHeight);

    ctx.drawImage(
      img,
      `-${sourceSize.axeX}`,
      `-${sourceSize.axeY}`,
      maxWidth,
      maxHeight
    );
    const img64 = canvasResize.toDataURL("image/jpeg");
    const final = new Image();

    console.log("image object URL : ", img);
    console.log("image 64 : ", img64);
    console.log("image final : ", final);

    setUpload({
      imageBase64: img64,
      name: sourceFile.name,
    });

    URL.revokeObjectURL(img);
    URL.revokeObjectURL(imgSrc);

    //console.log("final : ", final); //dataUrl image
  };
}

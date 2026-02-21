export const optimizeImage = (image, width = 400) => {
  if (!image) return "";

  let imageUrl = "";

  if (typeof image === "object" && image.url) {
    imageUrl = image.url;
  }

  return imageUrl.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},c_fill/`
  );
};

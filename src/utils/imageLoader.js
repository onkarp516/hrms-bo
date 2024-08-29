// create a file, e.g., src/utils/imageLoader.js

const importAll = (context) => {
  let images = {};
  context.keys().forEach((key) => {
    images[key] = context(key);
  });
  return images;
};

const images = importAll(
  require.context("../assets/images", false, /\.(png|jpe?g|svg)$/)
);

export default images;

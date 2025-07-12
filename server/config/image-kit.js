import ImageKit from "imagekit";
import config from "./config.js";

export const imagekit = new ImageKit({
  publicKey: config.imagekit.public_key,
  privateKey: config.imagekit.private_key,
  urlEndpoint: `https://ik.imagekit.io/${config.imagekit.app_id}/`,
});

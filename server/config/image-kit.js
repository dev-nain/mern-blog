import ImageKit from "imagekit";
import config from "./config.js";

if (!config.imagekit.public_key || !config.imagekit.private_key || !config.imagekit.app_id) {
  throw new Error('ImageKit configuration is incomplete. Please check environment variables.');
}

export const imagekit = new ImageKit({
  publicKey: config.imagekit.public_key,
  privateKey: config.imagekit.private_key,
  urlEndpoint: `https://ik.imagekit.io/${config.imagekit.app_id}/`,
});

const ImageKit = require("imagekit");
require('dotenv').config();
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file) {
    const result = await imagekit.upload({
        file: file, // Base64 string passed from controller
        fileName: "music_" + Date.now(),
        folder: "/yt-complete-backend/music"
    });
    return result;
}


module.exports = { uploadFile };
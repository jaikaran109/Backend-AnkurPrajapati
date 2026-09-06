// dekho jo images ya videos hote h vo direct store ni ho skte h, uske liye hmko kisi cloud based server provider ki need hoti h 
// imageKit tmhari image store kr leta h and phir ek url return krta h jisko tm server pe store kr skte ho and frontend me bhej skte ho

const {ImageKit} = require('@imagekit/nodejs')


const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file:buffer.toString("base64"),
        fileName:"image.jpg"
    })

    return result;
}

module.exports = uploadFile;
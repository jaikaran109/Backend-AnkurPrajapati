const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service")


async function createMusic(req, res) {
    try {
        const { title } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Music file is required" })
        }

        if (!title) {
            return res.status(400).json({ message: "Title is required" })
        }

        const result = await uploadFile(file.buffer.toString('base64'))

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id,
        })

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating music", error: err.message })
    }

}

async function createAlbum(req, res) {
    try {
        const { title, musics } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" })
        }

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musics,
        })

        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics,
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating album", error: err.message })
    }

}

async function getAllMusics(req, res) {
    try {
        const musics = await musicModel
            .find()
            .populate("artist", "username email")

        res.status(200).json({
            message: "Musics fetched successfully",
            musics: musics,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching musics", error: err.message })
    }

}

async function getAllAlbums(req, res) {
    try {
        const albums = await albumModel.find().select("title artist").populate("artist", "username email")

        res.status(200).json({
            message: "Albums fetched successfully",
            albums: albums,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching albums", error: err.message })
    }

}

async function getAlbumById(req, res) {
    try {
        const albumId = req.params.albumId;

        if (!albumId) {
            return res.status(400).json({ message: "Album ID is required" })
        }

        const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

        if (!album) {
            return res.status(404).json({ message: "Album not found" })
        }

        return res.status(200).json({
            message: "Album fetched successfully",
            album: album,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching album", error: err.message })
    }

}


module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById }
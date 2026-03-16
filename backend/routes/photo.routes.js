import express from "express";
import Photo from "../models/photo.model.js";
import mongoose from "mongoose";
import { createPhoto, deletePhoto, getPhotos, updatePhoto } from "../controllers/photo.controllers.js";


const router = express.Router();

router.get('/', getPhotos);

router.post('/', createPhoto);

router.delete('/:id', deletePhoto);

router.put('/:id', updatePhoto);

export default router;
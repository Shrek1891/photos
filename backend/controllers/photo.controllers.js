import Photo from '../models/photo.model.js';

export const getPhotos= async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json({ success: true, photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
};

export const createPhoto= async (req, res) => {
  const photo= await req.body;
  if (!photo.title || !photo.description || !photo.image) {
    return res.status(400).json({ error: 'Title, description, and image are required' });
  } 
  const newPhoto=new Photo({
    title: photo.title,
    description: photo.description,
    imageUrl: photo.image
  });
  try {
    await newPhoto.save();
    res.status(201).json({ success: true, photo: newPhoto });
  } catch (error) {
    console.error('Error saving photo:', error);
    res.status(500).json({ error: 'Failed to save photo' });
  }
}

export const deletePhoto= async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPhoto = await Photo.findByIdAndDelete(id);
    if (!deletedPhoto) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.status(200).json({ success: true, message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
}

export const updatePhoto= async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedPhoto) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.status(200).json({ success: true, photo: updatedPhoto });
  } catch (error) {
    console.error('Error updating photo:', error);
    res.status(500).json({ error: 'Failed to update photo' });
  }
}
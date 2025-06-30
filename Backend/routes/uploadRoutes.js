const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { upload, uploadFile, deleteFile } = require('../utils/fileUpload');

// General file upload route
router.post(
  '/',
  protect,
  upload.single('file'),
  async (req, res) => {
    try {
      // File is processed by multer middleware
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // If using Cloudinary, upload the file
      const result = await uploadFile(req.file.path, 'general');

      res.status(200).json({
        success: true,
        url: result.secure_url,
        filename: req.file.originalname,
        publicId: result.public_id,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error uploading file',
        error: error.message,
      });
    }
  }
);

// Multiple files upload route
router.post(
  '/multiple',
  protect,
  upload.array('files', 10),
  async (req, res) => {
    try {
      // Files are processed by multer middleware
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      const uploadResults = [];

      // If using Cloudinary, upload each file
      for (const file of req.files) {
        const result = await uploadFile(file.path, 'general');
        uploadResults.push({
          url: result.secure_url,
          filename: file.originalname,
          publicId: result.public_id,
        });
      }

      res.status(200).json({
        success: true,
        files: uploadResults,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error uploading files',
        error: error.message,
      });
    }
  }
);

// Delete file route
router.delete('/:publicId', protect, admin, async (req, res) => {
  try {
    const { publicId } = req.params;
    
    // Delete file from storage (e.g., Cloudinary)
    const result = await deleteFile(publicId);
    
    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting file',
      error: error.message,
    });
  }
});

module.exports = router;

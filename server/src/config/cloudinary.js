const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file buffer to Cloudinary
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise<Object>} Cloudinary upload result
 */
const uploadToCloudinary = (fileBuffer, folder = 'kyc-documents') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto:good' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
};

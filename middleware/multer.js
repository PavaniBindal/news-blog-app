const multer = require('multer');
const path = require('path');


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const filFilter = (req, file, cb) => {
  const allowedTypes = ['jpeg', 'jpg', 'png', 'gif'];
  const extName = file.mimetype.split('/')[1];
  if (allowedTypes.includes(extName)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filFilter
});

module.exports = upload;

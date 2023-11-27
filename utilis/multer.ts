import * as multer from 'multer';
import * as path from 'path';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export = storage;

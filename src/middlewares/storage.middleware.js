import multer from "multer";
import path from "path";
import crypto from "crypto";

const __dirname = path.resolve(path.dirname(""));

export const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const destination = path.join(__dirname, "storage");

    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop();
    const newFileName = `file-${crypto.randomUUID()}.${fileExtension}`;

    req.body[file.fieldname] = newFileName;
    cb(null, newFileName);
  },
});

export const uploadSingle = (fieldName) => {
  return multer({ storage }).single(fieldName);
};

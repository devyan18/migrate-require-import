import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const __dirname = path.resolve(path.dirname(""));

// config of storage for multer
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

// middleware to upload single file
export const uploadSingle = (fieldName) => {
  return multer({ storage }).single(fieldName);
};

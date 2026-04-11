import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        let folder = "";

        if (file.fieldname === "pet") {
            folder = "pets";
        }

        if (file.fieldname === "documents") {
            folder = "documents";
        }

        cb(null, path.join(__dirname, `../../public/${folder}`));

    },

    filename: function (req, file, cb) {

        cb(
            null,
            `${Date.now()}-${file.originalname}`
        );

    }

});

export const uploader = multer({ storage });
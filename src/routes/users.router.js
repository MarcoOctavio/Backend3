import { Router } from "express";
import { uploader } from "../utils/multer.js";
import User from "../dao/models/User.js";
import usersController from "../controllers/users.controller.js";

const router = Router();

router.get("/", usersController.getAllUsers);
router.post("/", usersController.createUser);
router.get("/:uid", usersController.getUser);
router.put("/:uid", usersController.updateUser);
router.delete("/:uid", usersController.deleteUser);

router.post(
    "/:uid/documents",
    uploader.array("documents"),
    async (req, res) => {

        try {

            const { uid } = req.params;

            const user = await User.findById(uid);

            if (!user) {
                return res.status(404).send({
                    status: "error",
                    message: "User not found"
                });
            }

            const files = req.files;

            if (!files || files.length === 0) {
                return res.status(400).send({
                    status: "error",
                    message: "No files uploaded"
                });
            }

            const documentsToAdd = files.map(file => ({
                name: file.originalname,
                reference: file.path
            }));

            user.documents.push(...documentsToAdd);

            await user.save();

            res.send({
                status: "success",
                payload: user.documents
            });

        } catch (error) {

            res.status(500).send({
                status: "error",
                message: error.message
            });

        }

    }
);

export default router;

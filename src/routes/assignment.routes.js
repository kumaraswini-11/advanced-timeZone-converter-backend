import express from "express";
import {
  createAssignment,
  deleteAssignment,
  getAssignments,
  updateAssignment,
  submitAssignment,
  gradeAssignment,
} from "../controllers/assignment.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  ensureTeacher,
  ensureStudent,
} from "../middlewares/userAuthorization.middleware.js";

const router = express.Router();
router.get("/", verifyToken, getAssignments);
router.post("/", verifyToken, createAssignment);
router.put("/:id", verifyToken, ensureTeacher, updateAssignment);
router.delete("/:id", verifyToken, ensureTeacher, deleteAssignment);

router.post(
  "/submit/:assignmentId",
  verifyToken,
  ensureStudent,
  submitAssignment
);
router.patch("/grade", verifyToken, ensureTeacher, gradeAssignment);

export default router;

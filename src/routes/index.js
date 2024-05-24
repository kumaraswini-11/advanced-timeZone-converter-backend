import { Router } from "express";
import authRoutes from "./auth.routes.js";
import assignmentRouters from "./assignment.routes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/assignments", assignmentRouters);

export default router;

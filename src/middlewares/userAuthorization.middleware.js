// Middleware to verify user roles (Authorization process)
export const checkUserRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res
      .status(403)
      .json({ message: "Forbidden: Insufficient permissions" });
  }
  next();
};

export const ensureTeacher = checkUserRole("TEACHER");
export const ensureStudent = checkUserRole("STUDENT");

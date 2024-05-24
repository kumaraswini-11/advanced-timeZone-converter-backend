import { prisma } from "../config/db.config.js";

export const getAssignments = async (req, res) => {
  try {
    const { sortBy, sortOrder, dueDate, totalScore } = req.query;

    const queryOptions = {
      orderBy: sortBy ? { [sortBy]: sortOrder || "asc" } : undefined,
      where: {
        dueDate: dueDate ? { equals: new Date(dueDate) } : undefined,
        totalScore: totalScore ? { equals: parseInt(totalScore) } : undefined,
      },
    };

    const assignments = await prisma.assignment.findMany(
      queryOptions ?? undefined
    );

    res.status(200).json({ data: assignments });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).send({ message: "Failed to fetch assignments." });
  }
};

export const createAssignment = async (req, res) => {
  const { title, description, dueDate, totalScore } = req.body;

  if ([title, dueDate, totalScore].some((field) => !field)) {
    return res
      .status(400)
      .json({ message: "Title, dueDate, and totalScore are required fields." });
  }

  try {
    const newAssignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate,
        totalScore,
        teacherId: req.user.id,
      },
    });

    // Send a mail to the students who have the mail id
    // sendMailToStudents(newAssignment);

    res.status(201).json({
      message: "Assignment created successfully.",
      data: newAssignment,
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).send({ message: "Failed to create assignment" });
  }
};

export const updateAssignment = async (req, res) => {
  const { id: assignmentId } = req.params;
  const { title, description, dueDate, totalScore } = req.body;

  if ([title, description, dueDate, totalScore].some((field) => !field)) {
    return res
      .status(400)
      .json({ message: "Invalid input ! Nothing to update." });
  }

  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { teacherId: true },
    });
    if (!assignment) {
      return res
        .status(404)
        .json({ message: "Assignment not found for update." });
    }

    if (assignment.teacherId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this assignment." });
    }

    const updatedAssignment = await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
        title,
        description,
        dueDate,
        totalScore,
      },
    });

    res.status(200).json({
      message: "Assignment updated successfully.",
      data: updatedAssignment,
    });
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).send({ message: "Failed to update assignment" });
  }
};

export const deleteAssignment = async (req, res) => {
  const { id: assignmentId } = req.params;

  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { teacherId: true },
    });

    if (!assignment) {
      return res
        .status(404)
        .json({ message: "Assignment not found for deletion." });
    }

    if (assignment.teacherId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this assignment." });
    }

    await prisma.assignment.delete({
      where: { id: assignmentId },
    });

    res.status(200).json({ message: "Assignment deleted successfully." });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    res.status(500).send({ message: "Failed to delete assignment." });
  }
};

export const submitAssignment = async (req, res) => {
  const { assignmentId, content } = req.body;

  if (!assignmentId || !content) {
    return res.status(400).json({
      message: "Missing required fields.",
    });
  }

  try {
    const newSubmission = await prisma.submission.create({
      studentId: Number(req.user.id),
      assignmentId: Number(assignmentId),
      content: content,
    });

    res.status(200).json({
      message: "Assignment submitted successfully.",
      data: newSubmission,
    });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({
      message: "Failed to submit assignment.",
    });
  }
};

export const gradeAssignment = async (req, res) => {
  const { submissionId } = req.params;
  const { grade } = req.query;

  try {
    const submissionDetails = await prisma.submission.findUnique({
      where: { id: Number(submissionId) },
    });

    if (!submissionDetails) {
      return res.status(404).json({
        message: "This submission not found.",
      });
    }

    const updatedSubmission = await prisma.submission.update({
      where: { id: Number(submissionId) },
      data: { grade: grade },
    });

    res.status(200).json({
      message: "Grade assigned successfully.",
      data: updatedSubmission,
    });
  } catch (error) {
    console.error("Error grading assignment:", error);
    res.status(500).send({ message: "Failed to assign grade." });
  }
};


import { Student } from "../models/Student.js";

const student = {
    // =========================================
    // WEBSITE CRUD
    // =========================================

    // READ ALL STUDENTS - Website
    index: async (req, res) => {
        try {
            const students = await Student.findAll();
            res.render("insert", { students });
        } catch (error) {
            console.error("Fetch students error:", error);
            res.status(500).send("Failed to load students.");
        }
    },

    // CREATE STUDENT - Website
    insert: async (req, res) => {
        try {
            const {
                FirstName,
                LastName,
                MiddleName,
                Program,
                YearLevel,
                Section
            } = req.body;

            if (!FirstName || !LastName || !Program || !YearLevel || !Section) {
                return res.status(400).send(
                    "Please fill in all required fields."
                );
            }

            await Student.create({
                FirstName,
                LastName,
                MiddleName: MiddleName || "",
                Program,
                YearLevel,
                Section
            });

            res.redirect("/students");
        } catch (error) {
            console.error("Insert student error:", error);
            res.status(500).send("Failed to add student.");
        }
    },

    // READ ONE STUDENT - Website Edit Page
    getStudent: async (req, res) => {
        try {
            const studentData = await Student.findByPk(req.params.id);

            if (!studentData) {
                return res.status(404).send("Student not found.");
            }

            res.render("edit", { student: studentData });
        } catch (error) {
            console.error("Get student error:", error);
            res.status(500).send("Failed to load student.");
        }
    },

    // UPDATE STUDENT - Website
    update: async (req, res) => {
        try {
            const studentData = await Student.findByPk(req.params.id);

            if (!studentData) {
                return res.status(404).send("Student not found.");
            }

            const {
                FirstName,
                LastName,
                MiddleName,
                Program,
                YearLevel,
                Section
            } = req.body;

            if (!FirstName || !LastName || !Program || !YearLevel || !Section) {
                return res.status(400).send(
                    "Please fill in all required fields."
                );
            }

            await studentData.update({
                FirstName,
                LastName,
                MiddleName: MiddleName || "",
                Program,
                YearLevel,
                Section
            });

            res.redirect("/students");
        } catch (error) {
            console.error("Update student error:", error);
            res.status(500).send("Failed to update student.");
        }
    },

    // DELETE STUDENT - Website
    delete: async (req, res) => {
        try {
            const studentData = await Student.findByPk(req.params.id);

            if (!studentData) {
                return res.status(404).send("Student not found.");
            }

            await studentData.destroy();
            res.redirect("/students");
        } catch (error) {
            console.error("Delete student error:", error);
            res.status(500).send("Failed to delete student.");
        }
    },

    // =========================================
    // POSTMAN API CRUD
    // =========================================

    // GET ALL STUDENTS - API
    apiIndex: async (req, res) => {
        try {
            const students = await Student.findAll();
            res.json(students);
        } catch (error) {
            console.error("API fetch students error:", error);
            res.status(500).json({
                message: "Failed to fetch students."
            });
        }
    },

    // CREATE STUDENT - API
    apiInsert: async (req, res) => {
        try {
            const {
                FirstName,
                LastName,
                MiddleName,
                Program,
                YearLevel,
                Section
            } = req.body;

            if (!FirstName || !LastName || !Program || !YearLevel || !Section) {
                return res.status(400).json({
                    message: "Please fill in all required fields."
                });
            }

            const newStudent = await Student.create({
                FirstName,
                LastName,
                MiddleName: MiddleName || "",
                Program,
                YearLevel,
                Section
            });

            res.status(201).json({
                message: "Student created successfully.",
                student: newStudent
            });
        } catch (error) {
            console.error("API insert student error:", error);
            res.status(500).json({
                message: "Failed to create student."
            });
        }
    },

    // GET ONE STUDENT - API
    apiShow: async (req, res) => {
        try {
            const studentData = await Student.findByPk(req.params.id);

            if (!studentData) {
                return res.status(404).json({
                    message: "Student not found."
                });
            }

            res.json(studentData);
        } catch (error) {
            console.error("API get student error:", error);
            res.status(500).json({
                message: "Failed to fetch student."
            });
        }
    },

    // UPDATE STUDENT - API
    apiUpdate: async (req, res) => {
        try {
            const studentData = await Student.findByPk(req.params.id);

            if (!studentData) {
                return res.status(404).json({
                    message: "Student not found."
                });
            }

            const {
                FirstName,
                LastName,
                MiddleName,
                Program,
                YearLevel,
                Section
            } = req.body;

            if (!FirstName || !LastName || !Program || !YearLevel || !Section) {
                return res.status(400).json({
                    message: "Please fill in all required fields."
                });
            }

            await studentData.update({
                FirstName,
                LastName,
                MiddleName: MiddleName || "",
                Program,
                YearLevel,
                Section
            });

            res.json({
                message: "Student updated successfully.",
                student: studentData
            });
        } catch (error) {
            console.error("API update student error:", error);
            res.status(500).json({
                message: "Failed to update student."
            });
        }
    },

    // DELETE STUDENT - API
    apiDelete: async (req, res) => {
        try {
            const studentData = await Student.findByPk(req.params.id);

            if (!studentData) {
                return res.status(404).json({
                    message: "Student not found."
                });
            }

            await studentData.destroy();

            res.json({
                message: "Student deleted successfully."
            });
        } catch (error) {
            console.error("API delete student error:", error);
            res.status(500).json({
                message: "Failed to delete student."
            });
        }
    }
};

export { student };

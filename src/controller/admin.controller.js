const pool = require("../config/db"); // PostgreSQL connection

// 👉 Create Admin
exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const result = await pool.query(
            "INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 👉 Get All Admins
exports.getAllAdmins = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM admins");

        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 👉 Get Admin by ID
exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM admins WHERE id = $1",
            [id]
        );

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 👉 Update Admin
exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const result = await pool.query(
            "UPDATE admins SET name=$1, email=$2 WHERE id=$3 RETURNING *",
            [name, email, id]
        );

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 👉 Delete Admin
exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM admins WHERE id=$1",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Admin deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
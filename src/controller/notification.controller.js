

const pool = require("../config/db");  

exports.createNotification = async (req, res) => {
    try {
        const { user_id, title, message } = req.body;

        if (!user_id || !title || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const result = await pool.query(
            "INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3) RETURNING *",
            [user_id, title, message]
        );

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
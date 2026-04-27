import User from "../model/user.model.js";

export const adminDashboard = async (req, res) => {
    try {
        let user = "This is admin Dashboard"
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({message: "error in admin dashboard"});
    }
}
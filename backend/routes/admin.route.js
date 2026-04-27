import express from "express";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/role.js";
import { adminDashboard } from "../controllers/admin.controller.js";

let adminRouter = express.Router();

adminRouter.get("/adminDashboard", isAuth, isAdmin(["admin"]), adminDashboard);

export default adminRouter;
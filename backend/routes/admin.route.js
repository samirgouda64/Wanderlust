import express from "express";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/role.js";
import { adminDashboard,approveListing,getAdminListings, markNotificationRead, pendingNotifications, rejectListing } from "../controllers/admin.controller.js";

let adminRouter = express.Router();

adminRouter.get("/adminDashboard", isAuth, isAdmin(["admin"]), adminDashboard);
adminRouter.get("/listings", isAuth, isAdmin(["admin"]), getAdminListings);
adminRouter.put("/approve-listing/:id",isAuth, isAdmin(["admin"]), approveListing);

adminRouter.put("/reject-listing/:id",isAuth, isAdmin(["admin"]), rejectListing);
adminRouter.get("/pending-notifications", isAuth, isAdmin(["admin"]), pendingNotifications);
adminRouter.put("/mark-notification-read/:id",isAuth, isAdmin(["admin"]), markNotificationRead);

export default adminRouter;
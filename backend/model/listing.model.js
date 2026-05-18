import mongoose from "mongoose";
import User from "./user.model.js";
import { type } from "os";

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String
},{_id:false});


const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image1: {
    type: imageSchema,
    required: true,
  },
  image2: {
    type: imageSchema,
    required: true,
  },
  image3: {
    type: imageSchema,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  landMark: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ratings:{
    type:Number,
    min:0,
    max:5,
    default:0
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  approvedAt: {
    type: Date,
  },
  rejectReason: {
    type: String,
    default: "",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {timestamps:true});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
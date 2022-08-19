import express from "express";
import Hotel from "../models/Hotel.js";
import {
  createHotel, updateHotel, deleteHotel,getHotels, countByCity,countByType
} from "../controllers/hotel.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


const router = express.Router();



router.post("/", verifyAdmin, createHotel)

 //UPDATE
 router.put("/:id", verifyAdmin, updateHotel)

//DELETE
router.delete("/:id",verifyAdmin, deleteHotel)

//CREATE
router.get("/", getHotels)

router.get("/countByCity", countByCity)

router.get("/countByType", countByType)









export default router;
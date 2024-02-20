import { Device } from "../db/db.js";
import bcrypt from "bcrypt";
import ApiError from "../error/ApiError.js";

class DeviceController {
  async addOne(req, res, next) {
    const { title, price, brand } = req.body;
    console.log(title);
    const product = await Device.create({
      title,
      price,
      brand,
    });
    return res.json({ product });
  }

  async getAll(req, res, next) {
    const allProducts = await Device.findAll();
    return res.json({ allProducts });
  }
}

export default new DeviceController();

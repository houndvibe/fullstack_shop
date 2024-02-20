import { Device } from "../db/db.js";
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
    async deleteOne(req, res, next) {
        const id = req.params.id;
        const product = await Device.destroy({
            where: {
                id,
            },
        });
        return res.json({ id });
    }
}
export default new DeviceController();

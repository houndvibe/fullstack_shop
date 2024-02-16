import { User } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};
class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(Error("Нет данных"));
        }
        const condidate = await User.findOne({ where: { email } });
        if (condidate) {
            return next(Error("Такой уже есть"));
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            email,
            role,
            password: hashedPassword,
        });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(Error("нет такого юзера"));
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(Error("Указа не верный пароль"));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async checkAuth(req, res, next) {
    }
}
export default new UserController();

import { User } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwt = (id, email, role): string => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next): Promise<string> {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(Error("Нет данных"));
    }

    const condidate = await User.findOne({ where: { email } });
    if (condidate) {
      return next(Error("Такой уже есть"));
    }

    const hashedPassword: string = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      role,
      password: hashedPassword,
    });
    const token: string = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async login(req, res, next): Promise<string> {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(Error("нет такого юзера"));
    }

    const comparePassword: boolean = bcrypt.compareSync(
      password,
      user.password
    );

    if (!comparePassword) {
      return next(Error("Указа не верный пароль"));
    }

    const token: string = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async checkAuth(req, res, next) {
    //TODO
  }
}

export default new UserController();

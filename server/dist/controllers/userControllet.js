class UserController {
    async registration(req, res) {
        res.send("registration");
    }
    async login(req, res) {
        res.send("login");
    }
    async check(req, res, next) {
        res.send("check");
    }
}
export default new UserController();

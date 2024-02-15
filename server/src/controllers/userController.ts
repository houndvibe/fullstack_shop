class UserController {
  async registration(req, res) {
    res.send("registration");
  }
  async login(req, res) {
    res.send("login");
  }
  async checkAuth(req, res, next) {
    res.send("checkAuth");
  }
}

export default new UserController();

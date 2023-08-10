import * as usersDao from "./users-dao.js";

let currentUser2;

const AuthController = (app) => {
  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await userDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };
  
      const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(404);
          return;
        }
        res.json(currentUser);
      };
     
      const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
      };
      
      
    const update = (req, res) => {
      const currentUser = req.session['currentUser'];
      if (!currentUser) {
        res.sendStatus(404);
        return;
      }
      const status = usersDao.updateUser(currentUser._id, req.body);
      currentUser2 = usersDao.findUserById(currentUser._id);
      console.log(currentUser2);
      res.json(status);
    };
  

 app.post("/api/users/register", register);
 app.post("/api/users/login", login);
 app.post("/api/users/profile", profile);
 app.post("/api/users/logout", logout);
 app.put ("/api/users/:uid", update);
};
export default AuthController;



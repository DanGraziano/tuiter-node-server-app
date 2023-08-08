import * as usersDao from "./users-dao.js";

let currentUser2;

const AuthController = (app) => {
    const register = (req, res) => {
        const username = req.body.username;
        const user = usersDao.findUserByUsername(username);
        if (user) {
          res.sendStatus(409);
          return;
        }
        const newUser = usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        currentUser2 = newUser;
        res.json(newUser);
      };

      const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);
        console.log(user);
        if (user) {
          req.session["currentUser"] = user;
          currentUser2 = user;
          res.json(user);
        } else {
          res.sendStatus(404);
        }
      };

      
      const profile = (req, res) => {
        //const currentUser = req.session["currentUser"];
        const currentUser = currentUser2;
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
      //const currentUser = req.session['currentUser'];
      const currentUser = currentUser2;
      if (!currentUser) {
        res.sendStatus(404);
        return;
      }
      const status = usersDao.updateUser(currentUser._id, req.body);
      //req.session['currentUser'] = usersDao.findUserById(currentUser._id);
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



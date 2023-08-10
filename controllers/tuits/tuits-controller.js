import * as tuitsDao from './tuits-dao.js'


const createTuit = async (req, res) => {
  const newTuit = req.body;
  newTuit.likes = 0;
  newTuit.liked = false;
  newTuit.time = "2h";
  newTuit.replies = 0;
  newTuit.retuits = 0;
  newTuit.disliked = false;
  newTuit.dislikes = 0;
  newTuit.handle = "@nasa";
  newTuit.userName = "NASA";
  newTuit.image = "/images/NASA_logo.png";
  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);
}

const findTuits = async (req, res) => {
  const tuits = await tuitsDao.findTuits()
  res.json(tuits);
}

const updateTuit = async (req, res) => {
  const tuitdId = req.params.tid;
  const updates = req.body;
  const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates);
  res.json(status);
}
  
const deleteTuit = async (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
  res.json(status);
}

export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}

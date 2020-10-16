const Dev = require('../models/Dev');

module.exports = {
  async store(req, res){
    const {user} = req.headers;
    const {devId} = req.param;

    // user logged
    const loggedDev = await Dev.findById(user);
    // user receive the liked
    const targetDev = await Dev.findById(devId);

    if(!targetDev){
      return res.status(400).json({ error: 'Dev not exists' });
    }

    loggedDev.dislikes.push(targetDev._id);
    await loggedDev.save();

    return res.json(loggedDev)
  }
};
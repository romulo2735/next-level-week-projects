const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    // user logged
    const loggedDev = await Dev.findById(user);
    console.log('Logado:', user);
    // user receive the liked
    const targetDev = await Dev.findById(devId);
    console.log('Alvo:', devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    // verificando o match entre os devs
    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[devId];

      if (loggedDev) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }

      if (targetDev) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id);
    await loggedDev.save();

    return res.json(loggedDev)
  }
};
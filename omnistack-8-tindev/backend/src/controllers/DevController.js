const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

  async index(req, res) {
    // capture the user logged
    const { user } = req.headers;
    const loggedDev = await Dev.findById(user);
    console.log(loggedDev);

    // Consulta onde retorna os usuário que não foram dado like e deslikes
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ],
    });

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    /** verify if user exists */
    const userExists = await Dev.findOne({ user: username });
    if (userExists) {
      return res.json(userExists);
    }
    /** */
    const response = await axios.get(`https://api.github.com/users/${username}`);
    /** */
    const { name, bio, avatar_url: avatar } = response.data;

    /** create user into database */
    const devData = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });

    return res.json(devData);
  }

};
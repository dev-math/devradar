const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  //lista usuarios cadastrados
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },
  //altera usuarios cadastrados
  // async index(request, response) {
  //   const devs = await Dev.find();
  //   return response.json(devs);
  // },
  //deleta usuarios cadastrados
  // async index(request, response) {
  //   const devs = await Dev.find();
  //   return response.json(devs);
  // },

  // armazena usuarios no bd
  async store(request, response) {
    const { github_username, skills, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio } = apiResponse.data;

      const skillsArray = parseStringAsArray(skills);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        avatar_url,
        bio,
        github_username,
        location,
        name,
        skills: skillsArray,
      });

      // Filtrar as conexões com no máximo 10km de distancia e q o dev tenha 
      //pelo menos uma das skills

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        skillsArray,
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
    return response.json(dev);
  }
}
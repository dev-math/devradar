const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  // busca os devs em um raio de x KM
  // filtra por skills
  async index(request, response) {
    const { latitude, longitude, skills } = request.query;

    const skillsArray = parseStringAsArray(skills);

    const devs = await Dev.find({
      skills: {
        $in: skillsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        }
      },
    });

    console.log(skillsArray);

    return response.json({ devs: [] });
  }
} 
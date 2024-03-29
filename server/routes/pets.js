const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getToken } = require('../getToken');

const favoritePets = [];

const getPetFinderInstance = async () => {
  try {
    const token = await getToken();
    const axiosInstance = axios.create({
      baseURL: 'https://api.petfinder.com/v2',
      timeout: 5000,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });
    return axiosInstance;
  } catch (error) {
    throw error;
  }
};

router.get('/', async (req, res) => {
  try {
    let axiosInstance = await getPetFinderInstance();
    let query = axiosInstance.get('/animals');
    const { q } = req.query;
    if (q) {
      query = axiosInstance.get(`/animals?type=${q}`);
    }
    const response = await query;

    const pets = response.data;
    res.json(pets);
  } catch (err) {
    // Handle other errors
    console.error('Error fetching pets:', err.message, err.stack);
    res.status(500).json({ message: 'Error fetching pets' });
  }
});

router.post('/:id/favorite', (req, res) => {
  const { id } = req.params;

  // Checks if the pet ID is already in the favorites array
  const index = favoritePets.findIndex((petId) => petId === id);

  if (index === -1) {
    // If not found, add it to favorites
    favoritePets.push(id);
  } else {
    // If found, remove it from favorites
    favoritePets.splice(index, 1);
  }

  // Respond with the updated list of favorite pet IDs
  res.json(favoritePets);
});

module.exports = router;

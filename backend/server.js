const path = require('path');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/api', async (req, res) => {
  console.log('we hit the route bro');
  try {
    console.log(req.query);
    const { q, resolutions } = req.query;
    const response = await axios.get(
      `https://wallhaven.cc/api/v1/search?q=${q}&resolutions=${resolutions}&page=1&category=111`
    );
    console.log(response);
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

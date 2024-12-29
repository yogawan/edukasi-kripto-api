const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3100;

app.use(cors());
app.use(express.json());

app.get('/api/crypto', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': '8694f4d6-f57b-4ac3-8db7-88a0b5eafc23',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch cryptocurrency data' });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'crypto',
        from: '2024-11-27',
        sortBy: 'publishedAt',
        apiKey: 'b4f0182f44494f48b527e0b5b7d2cc3f',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
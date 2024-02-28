const express = require('express');
const app = express();

const favCountries = []

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/welcome', (req, res) => {
  res.json('Welcome to countries of the world');
});

app.get('/favorites', (req, res) => {
  res.json(favCountries)
})

app.post('/favorites/new', (req, res) => {
  const newFavCountry = req.body
  if (!favCountries.find(country => country.name.common === newFavCountry.name.common)) favCountries.push(newFavCountry)
  res.json(favCountries)
})

app.delete('/favorites/delete', (req, res) => {
  const deletedCountry = req.body
  favCountries.splice(favCountries.findIndex(country => country.name.common === deletedCountry.name.common), 1)
  res.json(favCountries)
})

app.listen(3001, () => {
  console.log('Server is listening on port 3001.');
});
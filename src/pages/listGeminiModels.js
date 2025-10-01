const fetch = require('node-fetch');

const API_KEY = 'AIzaSyDT9R8maklkKUYXcLmNknYMLqWn_eDgn4k';

async function listModels() {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
  );
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

listModels();
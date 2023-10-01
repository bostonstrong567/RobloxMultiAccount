const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../Website')));

let playerDatabase = {};

app.post('/update-player', (req, res) => {
    const { userId, playerName, avatarUrl, valueName, value, status } = req.body;
    playerDatabase[userId] = { playerName, avatarUrl, valueName, value, status };
    res.status(200).send("Player data updated");
});

app.get('/get-player', (req, res) => {
    const { userId } = req.query;
    const playerData = playerDatabase[userId] || {};
    res.json(playerData);
});

app.get('/', (req, res) => {
    res.send('Server is running. Access /update-player to update player data and /get-player to get player data.');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

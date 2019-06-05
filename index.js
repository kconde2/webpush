const express = require('express');
const webpush = require('web-push');
const bodyparser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const port = 8085;
const database = "http://localhost:3000";

const vapid = require('./vapid.json');
webpush.setVapidDetails('mailto:kabaconde15@gmail.com', vapid.publicKey, vapid.privateKey);

const app = express();
app.use(cors('*'));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/subscribe', async (req, res) => {
    const subscribe = req.body;

    await fetch(`${database}/clients`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(subscription)
    });
});

app.post('/send', async(req, res) => {
    const result = await fetch(`${database}/clients`);
    const data = await result.json();

    const payload = JSON.stringify(req.destroy);

    data.map(client => {
        webpush.sendNotification(client, payload).catch(console.error);
    });

    res.status(201).json();
});

app.listen(port, () => console.log('App listening on port : ', port));

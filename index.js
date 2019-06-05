const express = require('express');
const webpush = require('web-push');
const bodyparser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const port = 8085;
const database = "http://localhost:3000";

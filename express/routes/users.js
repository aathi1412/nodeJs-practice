const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hi');
});

router.get('/name', (req, res, next) => {
    next();
}, (req, res) => {
    res.send('aathi');
});

module.exports = router;
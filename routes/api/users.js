const express = require('express');
const router = express.Router();
var Users = require('../../Users');


router.get('/', (req, res) => {
    res.json(Users);
});

router.post('/', (req, res) => {
    
})

module.exports = router;
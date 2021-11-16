const express = require('express');
const { postMessage, getMessages } = require('../controllers/message');

const router = express.Router()

router.post('/:id',postMessage);
router.get('/:id',getMessages);

module.exports = router;
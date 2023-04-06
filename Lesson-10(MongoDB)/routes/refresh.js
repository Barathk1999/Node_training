const express = require('express');
const router = express.Router();
const refereshToken = require('../controllers/refreshTokenController');

router.get('/',refereshToken.handleRefreshToken);

module.exports = router;
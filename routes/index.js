const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes'); // Assuming you have a taskRoutes file

router.use('/users', userRoutes);
router.use('/', taskRoutes);

module.exports = router;

var express = require('express');
var router = express.Router();
var coffeeCtrl = require('../controllers/cdiary');

/* GET users listing. */
router.get('/', coffeeCtrl.index);
router.get('/entries', coffeeCtrl.show);
router.post('/', coffeeCtrl.diaryEntry);
router.get('/entries/:id', coffeeCtrl.details)
router.delete('/entries/:id', coffeeCtrl.delete)
module.exports = router;

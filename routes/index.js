var express = require('express');
var router = express.Router();
var ctrlPages = require('../controllers/pages');
var ctrlOthers = require('../controllers/other');

/* Locations pages */
router.get('/', ctrlPages.search);
router.post('/', ctrlPages.scrapSearch);
router.get('/History', ctrlPages.historyKeywords);
router.get('/Images', ctrlPages.showImages);

/*Other pages*/
router.get('/about', ctrlOthers.about);

module.exports = router;

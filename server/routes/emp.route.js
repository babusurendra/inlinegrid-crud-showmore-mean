var express = require('express');
var router = express.Router();
var rwOperation = require('../controllers/emp.controller');

router.get('/', rwOperation.get);

router.post('/', rwOperation.add);
router.put('/:Id', rwOperation.update);
router.delete('/:Id', rwOperation.delete);
router.get('/export',rwOperation.exportdata);
    //res.json("req received to export");
//}); //
module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '实训在线——数据可视化展示' });
});

module.exports = router;

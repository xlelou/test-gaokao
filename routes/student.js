const router = require('koa-router')()
const studentM = require('../model/student')
router.prefix('/student')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/',async  function (ctx, next) {
  console.log(ctx)
  let img = tx.request.body.img
  let s = new studentM({
    img: img,
  
})
  // ctx.body = 'post'
  //ctx.render('student.ejs',{test:'test'})
})

module.exports = router

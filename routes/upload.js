const router = require('koa-router')();
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')


// router.get('/',async (ctx,next)=>{
//      console.log(ctx.body)
//     ctx.body = {
//         msg:1
//     }
// })


router.post('/',async (ctx,next)=>{


    // let result = {
    //     msg :"上传成功",
    //     success : true
    // }

    let savePath = path.join(__dirname,'../upload/images')

    let result = await uploadFile(ctx,{
        fileType : '',//album
        path:savePath
    })

    ctx.body = result
})

function mkdirsSync(dirname){
    if(fs.existsSync(dirname)){
        return true
    }else{
        if(mkdirsSync(path.dirname(dirname))){
            fs.mkdirSync(dirname)
            return true
        }
    }
}

function getSuffixName(fileName){
    let nameList = fileName.split('.')
    return nameList[nameList.length-1]
}

function uploadFile(ctx,options){
    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({headers: req.headers})
    let fileType = options.fileType || 'common'
    let filePath = path.join( options.path,  fileType)
    let mkdirResult = mkdirsSync( filePath )
    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        let result = { 
          success: false,
          message: '',
          data: null,
          filename:''
        }
    
        // 解析请求文件事件
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
           
          let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
          let _uploadFilePath = path.join( filePath, fileName )
          let saveTo = path.join(_uploadFilePath)
    
          // 文件保存到制定路径
          file.pipe(fs.createWriteStream(saveTo))
    
          // 文件写入事件结束
          file.on('end', function() {
            result.success = true
            result.message = '文件上传成功'
            result.filename = fileName
            result.data = {
              pictureUrl: `/images/${fileType}/${fileName}`
            }
           // console.log('文件上传成功！')
            resolve(result)
          })
        })
    
        // 解析结束事件
        busboy.on('finish', function( ) {
         // console.log('文件上结束')
          resolve(result)
        })
    
        // 解析错误事件
        busboy.on('error', function(err) {
         // console.log('文件上出错')
          reject(result)
        })
    
        req.pipe(busboy)
      })
}


module.exports = router;
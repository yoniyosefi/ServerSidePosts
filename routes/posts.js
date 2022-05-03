const express = require('express');
const multer =require('multer');

const {
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost
} =require('../controllers/post');

const router= express.Router();

const checkAuth = require('../middleware/check-auth');

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
};

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid= MIME_TYPE_MAP[file.mimetype];
        let error =new Error('Invalid mime type')
        if(isValid){
            error =null;
        }
        cb(error,"assets/images")
    },
    filename:(req, file,cb)=>{
        const name= file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name+'-'+Date.now()+'.'+ext);
    }
})


router.post('',checkAuth ,multer({storage:storage}).single("image"),createPost);

router.get('',getPosts);

router.get('/:id',getPost)

router.delete('/:id',checkAuth,deletePost);

router.put('/:id',checkAuth,multer({storage:storage}).single("image"),updatePost);

module.exports =router;
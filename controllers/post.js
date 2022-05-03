const Post = require('../models/post');


const createPost=  (req,res,next)=>{
    let post;
    if(req.file){
        const url= req.protocol+'://'+req.get("host");
        post = new Post({
            title:req.body.title,
            content:req.body.content,
            imagePath:url+"/assets/images/"+req.file.filename,
            creator:req.userData.userId
        });
    }else{
        post = new Post({
            title:req.body.title,
            content:req.body.content,
            creator:req.userData.userId
        });
    }

    post.save().then(createdPost=>{
        res.status(201).json({
            message:'Post Added Succesfuly',
            post:{
                id:createdPost._id,
                title:createdPost.title,
                content:createdPost.connect,
                imagePath:createdPost.imagePath?createdPost.imagePath:null
            }
        })
    }).catch(error=>{
        res.status(500).json({
            message:'Created Post Failed'
        })
    })

}

const getPosts= (req,res,next)=>{
    Post.find()
        .then(posts=>{
            res.status(200).json({
                massgage:'Post fetched succesfuly',
                posts:posts
            })
        }).catch(error=>{
            res.status(500).json({
                message:'Fetching posts faild'
            })
        })

}

const getPost =(req,res,next)=>{
    Post.findById(req.params.id)
        .then(post=>{
            if(post){
                res.status(200).json(post)  ;
            }else{
                res.status(404).json({
                    message:"Post not found"
                });
            }
        }).catch(error=>{
            res.status(500).json({
                message:'Fetching post faild'
            })
        })

}

const deletePost=(req,res,next)=>{
    const id =req.params.id;
    Post.deleteOne({_id:id,creator:req.userData.userId})
        .then(result=>{
            if(result.deletedCount>0){
                res.status(200).json({
                    message:"Post Deleted!"
                })
            }else{
                res.status(401).json({
                    message:"User Not Authorized!"
                })
            }
        }).catch(error=>{
            res.status(500).json({
                message:'Coud not delete post'
            })
        })

}

const updatePost=(req,res,next)=>{
    let post;
    if(req.file){
        const url= req.protocol+'://'+req.get("host");
        post = new Post({
            _id:req.params.id,
            title:req.body.title,
            content:req.body.content,
            imagePath:url+"/assets/images/"+req.file.filename,
            creator:req.userData.userId
        });

    }else if(req.body.imagePath){
        imagePath=req.body.imagePath;
        post = new Post({
            _id:req.params.id,
            title:req.body.title,
            content:req.body.content,
            imagePath:req.body.imagePath,
            creator:req.userData.userId
        });

    }else{
        post = new Post({
            _id:req.params.id,
            title:req.body.title,
            content:req.body.content,
            creator:req.userData.userId
        });
    }

    Post.updateOne({_id:req.params.id,creator:req.userData.userId},post)
        .then(result=>{
            if(result.matchedCount>0){
                res.status(200).json({
                    message:"Updated Successfull"
                })
            }else{
                res.status(401).json({
                    message:"User Not Authorized!"
                })
            }

        }).catch(error=>{
            res.status(500).json({
                message:'Coud not update post'
            })
        })
}


module.exports={
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost
}
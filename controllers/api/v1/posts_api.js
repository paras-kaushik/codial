const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.create = async function(req, res) {
    try {
      const post = new Post({
        content: req.body.content,
        user: req.user._id
      });
      const savedPost = await post.save();
      return res.json(201, {
        success: true,
        post: savedPost.toJSON(),
    })
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

module.exports.index = async function(req, res){
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){// authorization handling
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.json(200, {
                message: "Post and associated comments deleted successfully!"
            });
        }else{
            return res.json(401, {
                message: "You cannot delete this post!"
            });
        }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }

}

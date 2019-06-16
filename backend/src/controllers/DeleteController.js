const Post = require('../models/Post');

module.exports = {
  async store(req, res) {
    const post = await Post.findByIdAndDelete(req.params.id);

    await post.save();

    req.io.emit('del', post);
    return res.json({ post });
  },
};

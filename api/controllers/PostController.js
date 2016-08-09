module.exports = {
  find: async (req, res) => {
    try {
      res.ok({
        message: 'Create post success.',
        data: {
          items: await Post.findAll({ include: Tag }),
        }
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  },

  create: async (req, res) => {
    try {
      const { TagsArray } = req.body;
      const data = req.body;
      const user = AuthService.getSessionUser(req);
      data.UserId = user ? user.id : null;
      let newPost = await PostService.create(req.body);
      await TagService.updateOrCreate({
        postId: newPost.id,
        datas: TagsArray
      });
      res.ok({
        message: 'Create post success.',
        data: newPost,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      res.ok({
        message: 'find post success.',
        data: await Post.findByIdHasJoin(id),
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      res.ok({
        message: 'update post success.',
        data: await PostService.update(id, req.body),
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      res.ok({
        message: 'delete post success.',
        data: await Post.deleteById(id),
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError({ message: e.message, data: {}});
    }
  }
}

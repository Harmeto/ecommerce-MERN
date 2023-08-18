const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const User = require("../models/User");
const validateMongoDbId = require("../utils/validateMongodbId");

/**
 * Crea un blog
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>}
 */
const createBlog = asyncHandler(async (_, res) => {
  try {
    const newBlog = await Blog.create(_.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Actualiza un Blog
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>}
 */
const updateBlog = asyncHandler(async (_, res) => {
  const { id } = _.params;
  try {
    validateMongoDbId(id);
    const updateBlog = await Blog.findByIdAndUpdate(id, _.body, { new: true });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Visualiza un blog, añade 1 vista al blog visitado
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se encuentra el blog
 * @returns {Promise<void>}
 */
const getBlog = asyncHandler(async (_, res) => {
  const { id } = _.params;
  try {
    validateMongoDbId(id);
    const blog = await Blog.findById(id).populate('likes').populate('disLikes');
    await Blog.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true });
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Retorna todos los blogs
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si se encuentra ningun blog
 * @returns {Promise<void>}
 */
const getAllBlog = asyncHandler(async (_, res) => {
  try {
    const allBlog = await Blog.find();
    res.json(allBlog);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Elimina un blog por id
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se envian los datos necesarios
 * @returns {Promise<void>}
 */
const deleteBlog = asyncHandler(async (_, res) => {
  const { id } = _.params;
  try {
    validateMongoDbId(id);
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Like one Blog
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se encuentra un blog o no se envia a travez de un usuario
 * @returns {Promise<void>}
 */
const likeBlog = asyncHandler(async (_, res) => {
  const { blogId } = _.body;
  try {
    validateMongoDbId(blogId);
    const blog = await Blog.findById(blogId);
    const loginUser = _?.user?._id;
    const isLiked = blog?.isLiked;

    const alreadyDisliked = blog?.disLikes?.find(
      ((userId) => userId?.toString() === loginUser?.toString())
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { disLikes: loginUser }, isDislike: false },
        { new: true }
      );
      res.json(blog);
    }

    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { likes: loginUser }, isLiked: false },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { likes: loginUser }, isLiked: true },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * Dislike one Blog
 * @async
 * @function
 * @param {Object} _ - Request
 * @param {Object} res - Response
 * @throws {Error} Arroja error si no se encuentra un blog o no se envia a travez de un usuario
 * @returns {Promise<void>}
 */
const disLikeBlog = asyncHandler(async (_, res) => {
  const { blogId } = _.body;
  try {
    validateMongoDbId(blogId);
    const blog = await Blog.findById(blogId);
    const loginUser = _?.user?._id;
    const isDisLiked = blog?.isDislike;

    const alreadyLiked = blog?.likes?.find(
      ((userId) => userId?.toString() === loginUser?.toString())
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { likes: loginUser }, isLike: false },
        { new: true }
      );
      res.json(blog);
    }

    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { disLikes: loginUser }, isDislike: false },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { disLikes: loginUser }, isDislike: true },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog
};

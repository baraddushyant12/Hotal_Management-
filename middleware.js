const { reviewSchema } = require("./utils/validateReview");

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    return res.status(400).send(msg);
  }
  next();
};
  
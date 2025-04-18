const asyncMiddleware = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (ex) {
      next(ex);
      console.log(ex.message);
    }
  };
};

export default asyncMiddleware
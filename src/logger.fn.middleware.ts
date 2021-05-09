export const loggerFn = (req, res, next) => {
  console.log('xxx : loggerFn');
  next();
};

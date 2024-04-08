exports.notFound = (req,res,next) => {
   res.status(404).json({
      message: 'Requested URL does not exist!',
      status: 0
   })
}

exports.sendError = (error, req, res, next) => {
   console.log('server error!', error);
   const { statusCode, message } = error;
   res.status(statusCode || 500).json({
      message: message || 'Something went wrong!',
      status: 0,
   });
};

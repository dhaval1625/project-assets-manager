const genError = (code, message) => {
   const error = new Error(message);
   error.statusCode = code;
   throw error;
};

const handleValidation = (errors) => {
   if (!errors.isEmpty()) {
      genError(422, errors.array()[0].msg);
   }
}

module.exports = { genError, handleValidation };
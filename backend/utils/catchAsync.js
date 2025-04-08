/**
 * Wraps an async function to catch errors and pass them to Express's error handling middleware
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Wrapped function that catches errors
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = catchAsync; 
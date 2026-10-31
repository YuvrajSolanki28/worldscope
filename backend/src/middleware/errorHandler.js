export function notFound(req, res) { res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} was not found.`, code: 'NOT_FOUND' }); }
export function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  const status = error.status || 500;
  if (status >= 500) console.error(error);
  res.status(status).json({ success: false, message: status >= 500 && process.env.NODE_ENV === 'production' ? 'An unexpected server error occurred.' : error.message, code: error.code || 'INTERNAL_ERROR' });
}

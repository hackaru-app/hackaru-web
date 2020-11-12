export default function (_, res, next) {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
}

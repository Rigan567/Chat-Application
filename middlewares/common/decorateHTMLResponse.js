const decorateHTMLResponse = (page_title) => {
  return (pageTitleMiddleware = (req, res, next) => {
    res.locals.html = true;
    res.locals.title = `${page_title}-${process.env.APP_NAME}`;
    next();
  });
};

module.exports = decorateHTMLResponse;

const withAuth = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.logged_in || !req.session.user_id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    // User is logged in, proceed to the next middleware or route handler
    next();
  };

  module.exports = withAuth;
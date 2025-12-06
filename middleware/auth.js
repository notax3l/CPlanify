// middleware/auth.js

module.exports = {
  isLoggedIn: (req, res, next) =>
 {
    // if user is logged in, move to next
    if (req.isAuthenticated()) 
    {
      return next();
    }

    // if not logged in, send them to login page
    req.flash('error_msg', 'Please log in to continue.');
    //user sent to login page
    res.redirect('/auth/login');
    
  }
};

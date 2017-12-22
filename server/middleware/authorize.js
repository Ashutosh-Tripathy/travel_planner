import logger from '../logging/logger';

// middleware for doing role-based permissions
export default function permit(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  return (req, res, next) => {
    if (isAllowed(req.role)) { 
      next(); // role is allowed, so continue on the next middleware
    } 
	//else if (req.path.toLowerCase().startsWith('user') && (req.params.id || req.body.id) == req.userId) {
//      next();
//    }
 else if (req.path.toLowerCase().startsWith('trip')) {
      next();
    }
 else {
      res.status(403).json({ message: "Forbidden" }); // user is forbidden
    }
  }
}

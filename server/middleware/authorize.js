//import logger from '../logging/logger';
//
//// middleware for doing role-based permissions
//export default function authorize(...allowed) {
//
//	const isAllowed = role => allowed.indexOf(role) > -1;
//
//  // return a middleware
//  return (req, res, next) => {
//    	logger(2, `Role: ${req.role}`);
//  	logger(2, allowed);
//    if (isAllowed(req.role)) {
//      next(); // role is allowed, so continue on the next middleware
//    }
//    //else if (req.path.toLowerCase().startsWith('user') && (req.params.id || req.body.id) == req.userId) {
//    //      next();
//    //    }
//    else if (req.path.toLowerCase().startsWith('trip')) {
//      next();
//    }
//    else {
//      res.status(403).json({ message: "Forbidden" }); // user is forbidden
//    }
//  }
//}
//

'use strict';
import logger from '../logging/logger';

function authorize(req, res, next) {
	logger(2, `Role: ${req.role}`);
        logger(2, `Path: ${req.path}`);

  if (req.path.toLowerCase().startsWith('/api/trip')) {
    next();
  } else if (req.path.toLowerCase().startsWith('/api/user') && ['admin', 'manager'].indexOf(req.role) > -1) {
    next();
    } 
  else if (req.path.toLowerCase().startsWith('/api/authenticate')) {
	next();
}
  else {
	res.status(403).json({ message: "Forbidden" }); // user is forbidden
}
}


export default authorize;


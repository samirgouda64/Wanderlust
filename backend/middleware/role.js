const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.role || !allowedRoles.includes(req.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You do not have permission to perform this action',
      });
    }
    next();
  };
};

export default roleMiddleware;

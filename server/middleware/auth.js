import jwt from "jsonwebtoken";

export const varifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({ message: "Invalid Token or Token Expired" });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is available because verifyToken ran first
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access Denied: You do not have permission. Required: ${allowedRoles.join(
          " or "
        )}`,
      });
    }

    next();
  };
};

// router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {...})

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

async function authUser(req, res, next) {
  const { token } = req.headers;

 console.log(token);
 
  if (!token)
    return res.json({
      success: false,
      message: "UNAUTHORIZED",
      statusCode: 401,
    });

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    if (!decodedToken)
      return res.json({
    success: false,
    message: "FORBIDDEN Login again",
    statusCode: 403,
  });
 req.userId = decodedToken.id
  
    next();
  } catch (ex) {
    next(ex);
  }
}

export default authUser;

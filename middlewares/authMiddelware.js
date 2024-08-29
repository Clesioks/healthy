import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Falha da authenticação", success: false });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Falha da authenticação", success: false });
  }
};

export default authenticateToken;

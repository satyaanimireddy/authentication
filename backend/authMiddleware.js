import jwt from "jsonwebtoken";

export let auth = (req, res, next) => {
  try {
    const token = req.header("myToken");
    console.log("token from auth", token);
    if (!token) {
      return res.send("Token not found");
    } else {
      const decode = jwt.verify(token, "secret");
      console.log("token decoded", decode);
      req.id = decode.id;
      console.log("after decoded id:", decode.id);
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");

// extract the JWT from the request header
const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }
  return undefined;
};

//attach the user to the res object
const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req);
    console.log("this is the token", token);
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    const test = res.locals.user;
    console.log("res.locals.user obj", test);
    return next();
  } catch (err) {
    return next(err);
  }
};

// verify an authed user exists
const requireAuthenticatedUser = (req, res, next) => {
  try {
    console.log("req.headers.authorization", req.headers.authorization);
    const { user } = res.locals;

    console.log("res.locals user", user);
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = { extractUserFromJwt, requireAuthenticatedUser };
=======
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../utils/errors")

const jwtFrom = ({ headers }) => {
    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ")
        if(scheme.trim() === "Bearer") {
            return token
        }
    }
    return undefined
}

const extractUserFromJwt = (req, res, next) => {
    try {
        const token = jwtFrom(req)
        if(token) {
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }

        return next()
    } catch(error) {
        return next()
    }
}

const requireAuthenticatedUser = (req, res, next) => {
    try {
        const { user } = res.locals
        if(!user?.email) {
            throw new UnauthorizedError()
        }
        return next()
    } catch(error) {
        return next(error)
    }
}

module.exports = {
    jwtFrom,
    extractUserFromJwt,
    requireAuthenticatedUser
}
>>>>>>> main

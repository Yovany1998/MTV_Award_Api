var express = require('express');
var router = express.Router();
usersRoute = require("./users/index");

const passport = require('passport');
const passportJWT = require('passport-jwt');
const extractJWT = passportJWT.ExtractJwt;
const strategyJWT = passportJWT.Strategy;

passport.use(
  new strategyJWT(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (payload, next) => {
      // tienen la oportunidad de validaciones extras
      return next(null, payload);
    }
  )
);

//const jwtMiddleware = passport.authenticate('jwt', {session:false});

router.use(passport.initialize());

router.get('/', (req, res, nex)=>{
    res.status(200).json({msg:"Password Recovery"})
})

router.use('/users',usersRoute);
//router.use('/votes', jwtMiddleware, votesRoute);


module.exports = router; 
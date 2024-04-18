// // Utility functions for JWT
// const passport = require('passport');
// const { Strategy, ExtractJwt } = require('passport-jwt');
// const { JWT_SECRET } = require('../config/secrets');
// const User = require('../models/user');
//
// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: JWT_SECRET
// };
//
// passport.use(new Strategy(opts, async (jwtPayload, done) => {
//     try {
//         const user = await User.findOne({ where: { id: jwtPayload.id } });
//         if (!user) {
//             return done(null, false);
//         }
//         return done(null, user);
//     } catch (error) {
//         return done(error, false);
//     }
// }));
//
// module.exports = passport;

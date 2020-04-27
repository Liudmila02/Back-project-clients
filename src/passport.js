import passport from 'passport';
import PassportLocal from './local';

passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    name: user.name,
    email: user.email
  });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use('local', PassportLocal);

export default passport;

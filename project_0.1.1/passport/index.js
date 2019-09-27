const local = require('./localStrategy');
const { User } = require('../models/index.js');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {//user: 사용자 정보
    done(null, user.u_id);
  });

  passport.deserializeUser((id, done) => {//id: user.id정보 저장
    User.findOne({ where: { u_id: id } })//find -> findOne
      .then(user => done(null, user))//user: req.user 사용자 정보 저장
      .catch(err => done(err));
  });

  local(passport);
};
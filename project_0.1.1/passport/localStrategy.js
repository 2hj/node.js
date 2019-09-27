//로그인 전략 구현
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models/index.js');

module.exports = (passport) => {
  passport.use(new LocalStrategy({//1st 설정 인자
    usernameField: 'username',
    passwordField: 'password',
  }, async (i, p, d) => {//2st 실제 전략 수행 인자
    try {
      const exUser = await User.findOne({ where: { u_userId: i } });//find -> findOn
      if (exUser) {
        const result = await bcrypt.compare(p, exUser.u_password);//해싱된 코드를 비교하여 같으면 true 아니면 false를 반환
        if (result) {
          d(null, exUser);
        } else {
          d(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        d(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      d(error);
    }
  }));
};
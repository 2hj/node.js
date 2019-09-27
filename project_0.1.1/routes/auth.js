const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./loginstate');
const { User } = require('../models/index.js');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { id , n, pwd } = req.body;//pug의 이름에 맞는 곳의 값을 받아온다
  try {
    const exUser = await User.findOne({ where: { u_userId: id } });//find -> findOne
    if (exUser) {
      req.flash('joinError', '중복된 아이디 입니다.');
      return res.redirect('/join');
    }
    const hash = await bcrypt.hash(pwd, 12);
    await User.create({//튜플 생성
      u_userId: id,
      u_name: n,
      u_password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/:id/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {//authError: 있으면 실패, req.user: 있다면 성공
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);//info.message ?뭔지 알아볼 것
      return res.redirect(req.url);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/'+req.url.split("/")[1]);
    });
  })(req, res, next);
});

router.get('/:id/logout', isLoggedIn, (req, res) => {
  req.logout();//req.user 객체 제거
  req.session.destroy();//req.session 객체 제거
  res.redirect('/'+req.url.split("/")[1]);
});

module.exports = router;
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./loginstate');
const { User, Member, Japan } = require('../models/index.js');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', function(req, res) {

  res.redirect('/main');
});

router.get('/main', function(req, res) {
  res.render('main', {
    title: '홈',
    user: req.user
  });
});

router.get('/menu1', function(req, res, next) {
  res.render('menu1', {
    title: '조원소개',
    user: req.user
  });
});

router.get('/menu2', function(req, res, next) {
  res.render('menu2', {
    title: '현지학기제',
    user: req.user
  });
});

router.get('/menu3', function(req, res) {
  res.render('menu3', {
    title: 'Q & A',
    user: req.user
  }); 
});

router.get('/write', isLoggedIn, function(req, res) {
  res.render('write', {
    title: '글쓰기',
    user: req.user,
    q_id: req.query.no,
    u_id: req.query.mo
  }); 
});

router.get('/read', function(req, res) { 
  res.render('read', {
    title: '글읽기',
    user: req.user,
    q_id: req.query.no,
    u_id: req.query.mo    
  }); 
});

router.get('/:id/login', isNotLoggedIn, function(req,res) {  
  res.render('login', {
    title: '로그인',
    user: req.user,
    url: req.url,
    loginError: req.flash('loginError')
  });
});

router.get('/join', isNotLoggedIn, (req,res) => {
  res.render('join', {
    title: '회원가입',
    user: req.user,
    joinError: req.flash('joinError')   
  });
});

module.exports = router;

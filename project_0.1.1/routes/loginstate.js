exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).render('logerror', {
        title: 'logError!!'
      })
      // res.status(403).send('로그인 하세요.: 이 부분 좀 꾸며야 할 듯');
    }
  };
  
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};
/*
    isAuthenticated() : 로그인 상태이면 true 반환, 아니면 false 반환
*/
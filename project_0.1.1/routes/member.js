const express = require('express');
const router = express.Router();
const { Member } = require('../models/index.js');

router.get('/:id', (req,res,next)=> {
  Member.findOne({ where: { m_id: req.params.id } })
  .then((member)=> {
    console.log(member);
    res.json(member);
  })
  .catch((err)=>{
    console.error(err);
    next(err);
  });
});

router.patch('/:id', (req,res,next)=> {
  Member.update({
    m_comm: req.body.m_comm,
    m_res: req.body.m_res
  }, {
    where: { m_id:req.params.id }
  })
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    console.error(err);
    next(err);
  })
});

module.exports = router;

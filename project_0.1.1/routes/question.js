const express = require('express');
const { Question } = require('../models/index.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  }catch(err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const offset = parseInt(req.params.id);
    const questions = await Question.findAll({
      order: [['q_id', 'DESC']],
      offset: offset,
      limit: 10
    });

[
  {
    q_id:"",
    q_user_id:"",
    q_name:"",
    q_title:'',
    q_question:'',
  },
  {

  },
  {

  },

]

    res.json(questions);
  }catch(err) {
    console.error(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await Question.create({
      q_user_id: req.body.q_user_id,
      q_name: req.body.q_name,
      q_title: req.body.q_title,
      q_question: req.body.q_question
    });
    res.status(201).json(result);
  }catch(err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const result = await Question.update({
      q_title: req.body.q_title,
      q_question: req.body.q_question
    }, {
      where: { q_id: req.params.id }
    });
    res.json(result);
  }catch(err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Question.destroy({ where: { q_id: req.params.id } });
    res.json(result);
  }catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

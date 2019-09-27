const express = require('express');
const { Answer } = require('../models/index.js')

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const answers = await Answer.findAll({ where: { a_target_id: req.params.id }});
    res.json(answers);
  }catch(err) {
    console.error(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await Answer.create({
      a_user_id: req.body.a_user_id,
      a_name: req.body.a_name,
      a_answer: req.body.a_answer,
      a_target_id: req.body.a_target_id
    });
    res.status(201).json(result);
  }catch(err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const result = await Answer.update({
      a_answer: req.body.a_answer
    }, {
      where: { a_id: req.params.id }
    });
    res.json(result);
  }catch(err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Answer.destroy({ where: { a_id: req.params.id } });
    res.json(result);
  }catch(err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

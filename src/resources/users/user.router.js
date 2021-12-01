const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = new User({ name, login, password });
  await usersService.createUser(user);
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.updateUser(id, req.body);
  res.status(200).send(User.toResponse(user));
})

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUser(id);
  res.sendStatus(204);
});

module.exports = router;

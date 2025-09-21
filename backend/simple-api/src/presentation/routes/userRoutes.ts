import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  router.post('/users', (req, res) => userController.createUser(req, res));
  router.get('/users/:id', (req, res) => userController.getUser(req, res));
  router.get('/users', (req, res) => userController.getAllUsers(req, res));
  router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

  return router;
}
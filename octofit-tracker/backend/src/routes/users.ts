import { Router } from 'express';
import { listUsers, createUser, getUser, deleteUser } from '../controllers/userController';

const router = Router();

router.get('/', listUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;

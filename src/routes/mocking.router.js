import { Router } from 'express';
import { getMockingPets } from '../controllers/mocking.controllers.js';

const router = Router();

router.get('/mockingpets', getMockingPets);

export default router;
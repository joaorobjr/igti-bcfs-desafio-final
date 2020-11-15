import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router.post('/', transactionController.create);
router.get('/', transactionController.retrieve);
router.get('/:id', transactionController.findById);
router.patch('/:id', transactionController.update);
router.delete('/:id', transactionController.remove);
router.get('/all/period', transactionController.retrieveAllPeriod);

export default router;

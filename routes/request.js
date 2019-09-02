import { Router } from 'express';
import RequestController from '../controllers/RequestController';
import RequestValidation from '../middlewares/validations/RequestValidation';

const requestRouter = Router();

requestRouter.post(
  '/generate',
  RequestValidation.checkQuantity,
  RequestController.generateNumbers
);

export default requestRouter;

import { Router } from 'express';
import requestRouter from './request';

const apiRoutes = Router();

// API Routes
apiRoutes.use('/request', requestRouter);

// Matches /api the API home route
apiRoutes.get('/', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    statusCode: 200,
    message: "Phone number generator API"
  });
});

export default apiRoutes;

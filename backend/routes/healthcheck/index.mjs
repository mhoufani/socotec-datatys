import express from 'express';

const router = express.Router();

// Configure _app health route from external configuration
router.get(process.env.APP_HEALTHCHECK_ROUTE || '/health',
  (req, res) => {
    res.status(200)
      .send('ok')
      .end();
  });

export default router;

import express from 'express';
const router = express.Router();

router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

export default router;
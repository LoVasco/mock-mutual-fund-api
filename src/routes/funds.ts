import { Router } from 'express';
import { RequestHandler } from 'express';
import { funds } from '../data/funds';
import { randomDelay } from '../utils/randomDelay';

/**
 * Express Router instance for handling fund-related routes
 */
const router = Router();

/**
 * Handler for retrieving detailed information about a specific fund
 * @param {object} req - Express request object with ticker parameter
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const fundDetailHandler: RequestHandler<{ ticker: string }> = async (req, res) => {
    const { ticker } = req.params;

    try {
        // Simulate network latency
        await randomDelay();

        const fund = funds.find(fund => fund.ticker === ticker);

        if (!fund) {
            res.status(404).json({
                message: 'Fund not found',
                ticker
            });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(fund, null, 2));

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

// Route definitions
router.get('/:ticker', fundDetailHandler);

export default router;
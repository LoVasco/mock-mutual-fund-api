import { Router } from 'express';
import { RequestHandler } from 'express';
import { funds } from '../data/funds';
import { randomDelay } from '../utils/randomDelay';

const router = Router();

/**
 * Interface for the search query parameters
 */
interface SearchQuery {
    query?: string;
}

/**
 * Interface for the fund search response
 */
interface FundSearchResponse {
    name: string;
    ticker: string;
    secid: string;
}

/**
 * Transforms a fund object into the response format
 * @param fund - The fund object to transform
 * @returns The formatted fund response
 */
const formatFundResponse = (fund: any): FundSearchResponse => ({
    name: fund.name,
    ticker: fund.ticker,
    secid: fund.secid
});

/**
 * Calculates relevance score for a fund based on search term
 * @param fund - The fund to score
 * @param searchTerm - The search term to match against
 * @returns Numerical score indicating relevance
 */
const calculateFundRelevance = (fund: any, searchTerm: string): number => {
    return (fund.ticker?.toLowerCase() === searchTerm ? 2 : 0) +
           (fund.name?.toLowerCase() === searchTerm ? 2 : 0) +
           (fund.ticker?.toLowerCase().startsWith(searchTerm) ? 1 : 0) +
           (fund.name?.toLowerCase().startsWith(searchTerm) ? 1 : 0);
};

/**
 * Handler for the fund search endpoint
 * @description Searches funds by name or ticker symbol. Returns all funds if no query provided.
 * Results are sorted by relevance to the search term.
 */
const searchHandler: RequestHandler<{}, {}, {}, SearchQuery> = async (req, res) => {
    const { query } = req.query;

    // Simulate network latency
    await randomDelay();

    // Return all funds if no search query provided
    if (!query) {
        res.json(funds.map(formatFundResponse));
        return;
    }

    const searchTerm = query.toString().toLowerCase();

    // Filter and sort funds based on search relevance
    const filteredFunds = funds
        .filter(fund =>
            fund.ticker?.toLowerCase().includes(searchTerm) ||
            fund.name?.toLowerCase().includes(searchTerm)
        )
        .sort((a, b) =>
            calculateFundRelevance(b, searchTerm) - calculateFundRelevance(a, searchTerm)
        )
        .map(formatFundResponse);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(filteredFunds, null, 2));
};

// Route definition
router.get('/', searchHandler);

export default router;
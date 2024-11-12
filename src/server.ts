import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import fundDetailRoutes from './routes/funds';
import searchFundRoutes from './routes/searchFunds';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/funds/search', searchFundRoutes);
app.use('/api/funds', fundDetailRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
import express from "express"
import connectDB from "./src/config/db";
import rateLimit from "express-rate-limit";
import cors from "cors";
import bodyParser from "body-parser";
import transaction from "./src/middleware/transaction";
import Job from "./src/models/jobs";
import { JobPortalRoute } from "./src/routes";

const app = express();

const port = process.env.PORT ?? 4000;

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Handle CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all transactions
app.use(transaction);

// Apply the rate limiting middleware to all requests
app.use(limiter);

connectDB();

app.use("/", new JobPortalRoute().router)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

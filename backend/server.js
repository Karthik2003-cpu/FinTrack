import express from 'express';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);


app.get('/', (req, res) => {
    res.send("Hello world!");
});

const port = process.env.PORT || 7111;

const startServer = () => {
    connectDB();
    app.listen(port, () => {
        console.log(`Server start on port ${port}`);
    });
}

startServer();
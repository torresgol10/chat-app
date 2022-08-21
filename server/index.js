//index.js
import express from 'express';
//New imports
import http from 'http'
import cors from 'cors';

const app = express();
const PORT = 4000;

http.Server(app);

import { Server } from "socket.io";

const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000"
    }

});

//Add this before the app.get() block
io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

app.use(cors());

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

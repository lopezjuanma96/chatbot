import express from 'express';
import { Server as Io } from 'socket.io';
import { Server as Http } from 'http';

const app = express();
const http = new Http(app);
const io = new Io(http);

const history = [];

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
})

io.on('connection', (socket) => {
    console.log('user connected!');
    history.length = 0;
    history.push({src:'bot', text:'Hola! Buenas Tardes'})
    socket.emit('history', history);
    socket.on('msg', (msg) => {
        history.push({src:'user', text:msg});
        console.log(history);
        socket.emit('history', history);
    })
})

const PORT = 8080;
http.listen(PORT, () => console.log(`Connected to http://localhost:${PORT}`))
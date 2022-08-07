import express from 'express';

const app = express();

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
})

const PORT = 8080;
app.listen(PORT, () => console.log(`Connected to http://localhost:${PORT}`))
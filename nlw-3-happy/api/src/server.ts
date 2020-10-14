import express, {response} from 'express';

const app = express();

app.get('/users', (req, res) => {
    return res.json({ content: "Hello World"});
});

app.listen(3333);
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
});

app.post('/signup', (req: Request, res: Response) => {
  const { email, password } = req.body;
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

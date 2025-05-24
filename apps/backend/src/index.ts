import express, { Request, Response } from 'express';
import { setupAuthEP } from './modules/common/express/AuthEP';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

setupAuthEP(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

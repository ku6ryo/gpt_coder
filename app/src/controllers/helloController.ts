import { Request, Response } from 'express';

const helloController = (req: Request, res: Response) => {
  res.send('Hello!');
};

export default helloController;
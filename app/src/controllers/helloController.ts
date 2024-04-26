import { Request, Response } from 'express';

const helloController = (req: Request, res: Response) => {
  const name = req.query.name;
  if (typeof name !== 'string' || name.trim() === '') {
    res.status(400).send('Name parameter is required.');
    return;
  }
  res.send(`Hello, ${name}!`);
};

export default helloController;
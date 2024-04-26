import { Request, Response } from 'express';

const subtractController = (req: Request, res: Response) => {
  const { a, b } = req.query;
  if (typeof a !== 'string' || typeof b !== 'string') {
    res.status(400).send('Invalid input');
    return;
  }
  const aNum = parseInt(a, 10);
  const bNum = parseInt(b, 10);
  const difference = aNum - bNum;
  res.send(`Difference: ${difference}`);
};

export default subtractController;
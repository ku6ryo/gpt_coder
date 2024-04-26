import { Request, Response } from 'express';

const sumController = (req: Request, res: Response) => {
  const { a, b } = req.query;
  if (typeof a !== 'string' || typeof b !== 'string') {
    res.status(400).send('Invalid input');
    return;
  }
  const aNum = parseInt(a, 10);
  const bNum = parseInt(b, 10);
  if (isNaN(aNum) || isNaN(bNum)) {
    res.status(400).send('Non-numerical input');
    return;
  }
  const sum = aNum + bNum;
  res.send(`Sum: ${sum}`);
};

export default sumController;
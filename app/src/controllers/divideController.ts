import { Request, Response } from 'express';

const divideController = (req: Request, res: Response) => {
  const { a, b } = req.query;
  if (typeof a !== 'string' || typeof b !== 'string') {
    res.status(400).send('Invalid input');
    return;
  }
  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  if (isNaN(aNum) || isNaN(bNum)) {
    res.status(400).send('Non-numerical input');
    return;
  }
  if (bNum === 0) {
    res.status(400).send('Division by zero error');
    return;
  }
  const quotient = aNum / bNum;
  res.send(`Quotient: ${quotient}`);
};

export default divideController;
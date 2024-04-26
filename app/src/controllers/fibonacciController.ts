import { Request, Response } from 'express';
import { fibonacci } from '../utilities/fibonacciCalculator';

/**
 * Handles the Fibonacci calculation request.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {void} Sends the Fibonacci result or an error message.
 */
const fibonacciController = (req: Request, res: Response) => {
  const n = req.query.n;
  if (typeof n !== 'string' || isNaN(parseInt(n))) {
    res.status(400).send('Invalid input, please enter a valid number.');
    return;
  }

  const result = fibonacci.calculate(parseInt(n));
  res.send({ result });
};

export default fibonacciController;
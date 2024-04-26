import { Request, Response } from 'express';
import { validateSchema } from '../utilities/schemaValidator';

const schemaValidatorController = (req: Request, res: Response) => {
  try {
    const schema = JSON.parse(req.body);
    if (!validateSchema(schema)) {
      res.status(400).send('Schema is invalid!');
      return;
    }
    res.send('Schema is valid!');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export default schemaValidatorController;
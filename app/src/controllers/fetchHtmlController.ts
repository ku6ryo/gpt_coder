import axios from 'axios'
import { Request, Response } from 'express'

/**
 * Fetches HTML content from a given URL and sends it as a response.
 * The parameter 'url' in the query string is required.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @return {Promise<void>} A Promise that resolves when the HTML content is sent as a response.
 */
const fetchHtmlController = async (req: Request, res: Response) => {
  const url = req.query.url;
  if (typeof url !== 'string' || !url) {
    res.status(400).send('URL parameter is required.');
    return;
  }

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Failed to fetch HTML from the URL.');
  }
};

export default fetchHtmlController;
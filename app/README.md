# Project Title

This project sets up a basic Express.js server.

## Features

- API endpoint at `/hello` which responds with 'Hello, World!'
- API endpoint at `/sum` which calculates the sum of two numbers provided as query parameters and responds with the result.
- API endpoint at `/subtract` which calculates the difference between two numbers provided as query parameters and responds with the result.
- API endpoint at `/multiply` which calculates the product of two numbers provided as query parameters and responds with the result.
- API endpoint at `/upload` allowing POST requests to upload an image and respond with its dimensions.

## Setup

1. Ensure you have Node.js and Yarn installed.
2. Install dependencies with `yarn install`.
3. Start the server with `yarn start`.

## Usage

Once the server is running, access the available API endpoints:
- For `hello` visit `http://localhost:3000/hello`
- For `sum`, send a GET request to `http://localhost:3000/sum?a=10&b=5`
- For `subtract`, send a GET request to `http://localhost:3000/subtract?a=10&b=5`
- For `multiply`, send a GET request to `http://localhost:3000/multiply?a=10&b=5`
- To `upload` an image, send a POST request to `http://localhost:3000/upload` with an image file included in the request.
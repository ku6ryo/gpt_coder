# Project Title

This project sets up a basic Express.js server.

## Features

- API endpoint at `/hello` which responds with 'Hello, World!'
- API endpoint at `/sum` which calculates the sum of two numbers provided as query parameters and responds with the result.
- API endpoint at `/subtract` which calculates the difference between two numbers provided as query parameters and responds with the result.
- API endpoint at `/multiply` which calculates the product of two numbers provided as query parameters and responds with the result.
- API endpoint at `/divide` which calculates the quotient of two numbers provided as query parameters and responds with the result if not dividing by zero.
- API endpoint at `/upload` allowing POST requests to upload an image and respond with its dimensions.
- API endpoint at `/download` to download a file from Google Cloud Storage using a file path parameter `f`.

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
- For `divide`, send a GET request to `http://localhost:3000/divide?a=10&b=5` avoiding division by zero
- To `upload` an image, send a POST request to `http://localhost:3000/upload` with an image file included in the request.
- For `download`, send a GET request to `http://localhost:3000/download?f=path_to_file`
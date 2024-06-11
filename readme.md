# norwegian-tide-app

A simple data visualization tool for tidal water of Norwegian harbors. NOT a real weather app.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Prerequisites

- [Node version >= 18.0](https://nodejs.org/en)
- [Homebrew](https://brew.sh/)
- [Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-mac-os/)

### Installing

Ensure that your redis server is running in the background, you can run

    brew services start redis

From the project root directory, run the following to download the BE dependencies:

    cd server/ && npm install

Create a self-signed OpenSSL certificate by running the following:

    openssl genrsa -out key.pem 2048
    openssl req -new -key key.pem -out csr.pem
    openssl x509 -req -in csr.pem -signkey key.pem -out cert.pem

And follow the instructions in the terminal

Start the backend server by running the following:

    node index.js

you should see `Example https server listening on port 3000` in your terminal if the server is successfully running.

In a separate terminal tab, download the FE dependencies from the project root directory:

    cd frontend/ && npm install

and start the React server by running the following:

    npm run dev

# Product Site Backend

A basic Express.js server for a small product site backend. This serves as a proof of concept to demonstrate the Express framework structure.

## Features

- Basic Express.js server setup
- Welcome route at home (`/`)
- Health check endpoint (`/health`)
- Error handling middleware
- Request logging
- Clean and scalable structure

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. For development:
```bash
npm run dev
```

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check status

## Server Configuration

- Default port: 3000
- Default host: localhost
- Environment variables supported:
  - `PORT` - Server port
  - `HOST` - Server host
  - `NODE_ENV` - Environment mode

## Project Structure

```
├── server.js       # Main server file
├── package.json    # Project dependencies and scripts
├── .gitignore     # Git ignore rules
└── README.md      # Project documentation
```

## Future Expansion

This basic structure is designed to be easily expandable with:
- Route modules
- Database connections
- Authentication middleware
- API versioning
- Environment configuration
- Testing setup

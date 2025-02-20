# Flow Distribution Algorithm Backend

## Overview

The Flow Distribution Algorithm Backend is a Node.js-based backend system designed to allocate users to astrologers in a fair and balanced manner. The system ensures equal distribution while allowing flexibility for top astrologers to receive preferential flow. It is built using Node.js, Express.js, and MongoDB.

## Features

- Fair and balanced user-to-astrologer allocation.

- Dynamic flow adjustment for top astrologers.

- RESTful API for managing the flow and retrieving astrologer details.

- Supports scalability for handling up to 3000 users daily.

- Comprehensive unit testing with Jest & Chai.

- Secure authentication and authorization.

## Tech Stack

- Backend: Node.js, Express.js

- Database: MongoDB (Mongoose ORM)

- Testing: Jest, Chai, Mocha

- Middleware: JWT Authentication, CORS, Error Handling

## Installation

### Prerequisites

- Install Node.js (>= 14.x)

- Install MongoDB (or use MongoDB Atlas for cloud storage)

- Install Postman for API testing (optional)

### Setup Instructions

1. Clone the repository:

git clone https://github.com/your-repo-url.git
cd flow-distribution-backend

2. Install dependencies:

npm install

3. Create a .env file in the root directory and add the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/flow-distribution
JWT_SECRET=your_secret_key

4. Start the server:

npm start

5. Run tests:

npm test

## API Documentation

1. Astrologer Routes

Get all astrologers

GET /api/astrologers

Response:

{
  "success": true,
  "astrologers": [
    {
      "_id": "12345",
      "name": "John Doe",
      "connections": 10
    }
  ]
}

Create an astrologer

POST /api/astrologers

Request Body:

{
  "name": "John Doe"
}

Response:

{
  "success": true,
  "message": "Astrologer created successfully"
}

2. Flow Distribution Routes

Assign user to an astrologer

POST /api/flow/assign

Request Body:

{
  "userId": "12345"
}

Response:

{
  "success": true,
  "assignedTo": "John Doe"
}

Toggle Top Astrologer Priority

PUT /api/flow/toggle-priority/:astrologerId

Response:

{
  "success": true,
  "message": "Priority toggled successfully"
}

## Algorithm Logic

### User Allocation:

Distributes users equally among astrologers.

Uses round-robin scheduling to prevent biases.

### Top Astrologer Adjustment:

Allows increasing or decreasing flow dynamically.

Uses a priority queue to manage preferred astrologers.

### Performance Optimizations:

Uses caching (Redis) to minimize DB queries.

Ensures non-blocking operations with async functions.

## Folder Structure
```
flow-distribution-backend/
│── src/
│   │── config/
│   │── controllers/
│   │── middleware/
│   │── models/
│   │── routes/
│   │── services/
│   │── utils/
│   │── index.js
│   │── server.js
│── test/
│── .env
│── package.json
│── README.md
```

## Future Improvements

- Implement WebSockets for real-time astrologer-user pairing.

- Enhance machine learning-based flow optimization.

- Improve rate limiting and API security.

## Contributing

1. Fork the repository.

2. Create a new branch (feature-xyz).

3. Commit your changes.

4. Push to your branch and create a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any queries, feel free to reach out at sharadsingh0203@gmail.com 🚀

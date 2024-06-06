# FinTracker

FinTracker is a full-stack application for tracking finances, built with React, Redux Toolkit, TypeScript, Express, and MongoDB.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone GIT URL
   cd fintracker/ft-back
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `ft-back` directory and add the following:

   ```env
   MONGODB_URI=mongodb://localhost:27017/fintracker
   PORT=8080
   ```

4. Start the MongoDB server:

   ```bash
   mongod or mongosh
   ```

5. Run the backend server:

   ```bash
   npm run dev
   ```

   The backend server will start on `http://localhost:8080`.

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../ft-front
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `ft-front` directory and add the following:

   ```env
   REACT_APP_BACK_URL=http://localhost:8080/api
   ```

4. Run the frontend development server:

   ```bash
   npm start
   ```

   The frontend server will start on `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the registration form to create a new user.
3. Monitor the console for any potential errors or logs.

## API Endpoints

### User Registration

- **URL:** `/api/users/register`
- **Method:** `POST`
- **Body Parameters:**
  - `name`: string
  - `email`: string
  - `password`: string

### Example Request

```bash
curl 'http://localhost:8080/api/users/register' -X POST -H 'Content-Type: application/json' --data-raw '{"name":"test","email":"test@test.com","password":"test"}'
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**

   - Ensure MongoDB is running.
   - Verify the `MONGODB_URI` in your `.env` file is correct.

2. **CORS Issues:**

   - Ensure the backend is configured to handle CORS requests.
   - Verify the `REACT_APP_BACK_URL` in your `.env` file is correct.

3. **Frontend not loading:**
   - Ensure the frontend development server is running on `http://localhost:3000`.
   - Check the console for any errors.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.

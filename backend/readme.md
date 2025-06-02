# User Registration Endpoint Documentation

## POST `/users/register`

Registers a new user in the system.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

#### Field Requirements

- `fullname.firstName` (string, required): Minimum 3 characters.
- `fullname.lastName` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **201 Created**

  - User registered successfully.
  - Returns a JSON object with a message, user info, and authentication token.
  - Example:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "665f1c2b7b8e2a0012a12345",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **400 Bad Request**

  - Validation failed (e.g., missing or invalid fields).
  - Returns an array of error messages.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "First name is required",
          "param": "fullname.firstName",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - Unexpected server error.
  - Example:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### Example cURL Request

```sh
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourPassword123"
  }'
```

### Example Response

A successful response from the `/users/register` endpoint (`201 Created`) will look like:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "665f1c2b7b8e2a0012a12345",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

An error response (`400 Bad Request`) will look like:

```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstName",
      "location": "body"
    }
  ]
}
```

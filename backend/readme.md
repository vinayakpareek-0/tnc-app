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

---

# User Login Endpoint Documentation

## POST `/users/login`

Authenticates a user and returns a token.

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **200 OK**

  - Login successful.
  - Returns a JSON object with a message, user info, and authentication token.
  - Example:
    ```json
    {
      "message": "Login successful",
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
          "msg": "Invalid email format",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**

  - Invalid email or password.
  - Example:
    ```json
    {
      "message": "Invalid email or password"
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
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourPassword123"
  }'
```

### Example Response

A successful response from the `/users/login` endpoint (`200 OK`) will look like:

```json
{
  "message": "Login successful",
  "user": {
    "id": "665f1c2b7b8e2a0012a12345",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

An error response (`401 Unauthorized`) will look like:

```json
{
  "message": "Invalid email or password"
}
```

---

# User Profile Endpoint Documentation

## GET `/users/profile`

Retrieves the authenticated user's profile information.

### Authentication

Requires a valid JWT token in the `Authorization` header as `Bearer <token>` or in the `token` cookie.

### Responses

- **200 OK**

  - Returns the user's profile information.
  - Example:
    ```json
    {
      "message": "User profile retrieved successfully",
      "user": {
        "id": "665f1c2b7b8e2a0012a12345",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
      }
    }
    ```

- **401 Unauthorized**

  - Missing or invalid authentication token.
  - Example:
    ```json
    {
      "message": "Authentication required"
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
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <your_token_here>"
```

### Example Response

A successful response from the `/users/profile` endpoint (`200 OK`) will look like:

```json
{
  "message": "User profile retrieved successfully",
  "user": {
    "id": "665f1c2b7b8e2a0012a12345",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}
```

An error response (`401 Unauthorized`) will look like:

```json
{
  "message": "Authentication required"
}
```

---

# User Logout Endpoint Documentation

## GET `/users/logout`

Logs out the authenticated user by invalidating their token.

### Authentication

Requires a valid JWT token in the `Authorization` header as `Bearer <token>` or in the `token` cookie.

### Responses

- **200 OK**

  - Logout successful.
  - Example:
    ```json
    {
      "message": "Logout successful"
    }
    ```

- **401 Unauthorized**

  - Missing or invalid authentication token.
  - Example:
    ```json
    {
      "message": "Authentication required"
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
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <your_token_here>"
```

### Example Response

A successful response from the `/users/logout` endpoint (`200 OK`) will look like:

```json
{
  "message": "Logout successful"
}
```

An error response (`401 Unauthorized`) will look like:

```json
{
  "message": "Authentication required"
}
```

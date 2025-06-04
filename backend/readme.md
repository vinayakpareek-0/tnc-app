# API Documentation

This document describes the authentication and registration endpoints for Users and Captains.

---

## Table of Contents

- [User Endpoints](#user-endpoints)
  - [Register](#user-register)
  - [Login](#user-login)
  - [Profile](#user-profile)
  - [Logout](#user-logout)
- [Captain Endpoints](#captain-endpoints)
  - [Register](#captain-register)

---

## User Endpoints

### User Register

**POST** `/users/register`

Registers a new user.

#### Request Body

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

#### Field Reference

| Field              | Type   | Required | Description          | Constraints      |
| ------------------ | ------ | -------- | -------------------- | ---------------- |
| fullname.firstName | string | Yes      | User's first name    | min 3 characters |
| fullname.lastName  | string | Yes      | User's last name     | min 3 characters |
| email              | string | Yes      | User's email address | valid email      |
| password           | string | Yes      | User's password      | min 6 characters |

#### Responses

- **201 Created**
  - User registered successfully.
  - Returns: `message`, `user`, `token`
- **400 Bad Request**
  - Validation failed. Returns: `errors` array.
- **500 Internal Server Error**
  - Unexpected server error.

#### Example Success Response

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

#### Example Error Response

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

#### Example cURL

```sh
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourPassword123"
  }'
```

---

### User Login

**POST** `/users/login`

Authenticates a user and returns a token.

#### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

#### Field Reference

| Field    | Type   | Required | Description     | Constraints      |
| -------- | ------ | -------- | --------------- | ---------------- |
| email    | string | Yes      | User's email    | valid email      |
| password | string | Yes      | User's password | min 6 characters |

#### Responses

- **200 OK**
  - Login successful. Returns: `message`, `user`, `token`
- **400 Bad Request**
  - Validation failed. Returns: `errors` array.
- **401 Unauthorized**
  - Invalid email or password.
- **500 Internal Server Error**
  - Unexpected server error.

#### Example Success Response

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

#### Example Error Response

```json
{
  "message": "Invalid email or password"
}
```

#### Example cURL

```sh
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourPassword123"
  }'
```

---

### User Profile

**GET** `/users/profile`

Retrieves the authenticated user's profile.

#### Authentication

- Requires JWT token in `Authorization: Bearer <token>` header or `token` cookie.

#### Responses

- **200 OK**
  - Returns: `message`, `user`
- **401 Unauthorized**
  - Missing or invalid authentication token.
- **500 Internal Server Error**
  - Unexpected server error.

#### Example Success Response

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

#### Example Error Response

```json
{
  "message": "Authentication required"
}
```

#### Example cURL

```sh
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <your_token_here>"
```

---

### User Logout

**GET** `/users/logout`

Logs out the authenticated user.

#### Authentication

- Requires JWT token in `Authorization: Bearer <token>` header or `token` cookie.

#### Responses

- **200 OK**
  - Returns: `message`
- **401 Unauthorized**
  - Missing or invalid authentication token.
- **500 Internal Server Error**
  - Unexpected server error.

#### Example Success Response

```json
{
  "message": "Logout successful"
}
```

#### Example Error Response

```json
{
  "message": "Authentication required"
}
```

#### Example cURL

```sh
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <your_token_here>"
```

---

## Captain Endpoints

### Captain Register

**POST** `/captains/register`

Registers a new captain.

#### Request Body

```json
{
  "fullname": {
    "firstName": "Alex",
    "lastName": "Rider"
  },
  "email": "alex@gmail.com",
  "password": "Pass123",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "lat": 12.9716,
    "lng": 77.5946
  }
}
```

#### Field Reference

| Field               | Type   | Required | Description                | Constraints        |
| ------------------- | ------ | -------- | -------------------------- | ------------------ |
| fullname.firstName  | string | Yes      | Captain's first name       | min 3 characters   |
| fullname.lastName   | string | Yes      | Captain's last name        | min 3 characters   |
| email               | string | Yes      | Captain's email            | valid email        |
| password            | string | Yes      | Captain's password         | min 6 characters   |
| vehicle.color       | string | Yes      | Vehicle color              | min 3 characters   |
| vehicle.plate       | string | Yes      | Vehicle plate number       | min 3 characters   |
| vehicle.capacity    | number | Yes      | Vehicle passenger capacity | min 1              |
| vehicle.vehicleType | string | Yes      | Type of vehicle            | car, bike, or auto |
| location.lat        | number | Yes      | Latitude                   |                    |
| location.lng        | number | Yes      | Longitude                  |                    |

#### Responses

- **201 Created**
  - Captain registered successfully.
  - Returns: `message`, `captain`, `token`
- **400 Bad Request**
  - Validation failed. Returns: `errors` array.
- **500 Internal Server Error**
  - Unexpected server error.

#### Example Success Response

```json
{
  "message": "Captain registered successfully",
  "captain": {
    "id": "665f1c2b7b8e2a0012a12345",
    "fullname": {
      "firstName": "Alex",
      "lastName": "Rider"
    },
    "email": "alex@gmail.com",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": 12.9716,
      "lng": 77.5946
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Example Error Response

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

#### Example cURL

```sh
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstName": "Alex", "lastName": "Rider" },
    "email": "alex@gmail.com",
    "password": "Pass123",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": 12.9716,
      "lng": 77.5946
    }
  }'
```

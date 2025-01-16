
# EarnWave
EarnWave is a user-friendly freelance marketplace designed to connect job seekers with potential employers. The platform offers a seamless experience with features like:

- **User Authentication**: Secure login and signup functionality.
- **Browse Jobs**: View all available job listings.
- **Post a Job**: Employers can create and share job postings.

EarnWave empowers users to find opportunities or recruit talent effortlessly in a modern, intuitive environment.


## Project Setup

### 1. Clone the repository using

```bash
  git clone https://github.com/Palmistry2310/Freelancer-marketplace.git
```

### 2. Install the dependencies
Change the directory to project dir and install the dependencies
```bash
  cd Freelancer-marketplace
  npm install
```

### 3. Setup environment variables
Create a `.env` file in your root directory of the project. Add the following variables in your `.env` file.

```bash
MONGO_URL=mongodb://localhost:27017/<database name>
MONGO_ATLAS=<mongodb atlas url>
PORT=3000
JWT_SECRET=thisisajwtsecret
NODE_ENV=dev
```

After performing all the above steps, run the following command to serve the website

```bash
npm run dev
```

You will see the website running on the port http://localhost:3000 (default)


# API Documentation

### Base URL
```
http://localhost:3000/
```

### General Information
- **Format**: All endpoints return data in JSON format.
- **Authentication**: Certain endpoints require authentication via jwt tokens.

---

## API Routes

### Quick Reference Table

| **Method** | **Endpoint**         | **Description**                   | **Auth Required** |
|------------|----------------------|-----------------------------------|-------------------|
| `GET`      | `/jobs`              | Fetch all job listings.           | No                |
| `GET`     | `/jobs/create`              | Displays the create job page.         | Yes               |
| `POST`      | `/jobs/create`          | Create a new job listing.  | Yes                |
| `GET`      | `/login`          | Displays the login page.           | No               |
| `POST`   | `/login`          | Verifies the user email and password and signs jwt.             | No               |
| `GET`   | `/signup`          | Displays the signup page.             | No               |
| `POST`   | `/signup`          | Creates a new user.             | No               |

---

### Route Details

#### 1. Fetch All Job Listings
**Endpoint:** `GET /jobs`  
**Description:** Returns a list of all available jobs.

**Request Parameters:**  
_None_

**Response Example:**
```json
[
  {
    _id: new ObjectId('6788ff1e772022b3a6495dec'),
    title: 'NEW JOB',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with ",
    skillsRequired: [ 'ejs', 'nextjs', 'mern' ],
    deadline: 2025-02-01T00:00:00.000Z,
    budget: 5000,
    createdAt: 2025-01-16T12:44:14.536Z,
    updatedAt: 2025-01-16T12:44:14.536Z,
    __v: 0
  },
  {
    _id: new ObjectId('6788ff1e772022b3a6495dec'),
    title: 'NEW JOB',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with ",
    skillsRequired: [ 'ejs', 'nextjs', 'mern' ],
    deadline: 2025-02-01T00:00:00.000Z,
    budget: 5000,
    createdAt: 2025-01-16T12:44:14.536Z,
    updatedAt: 2025-01-16T12:44:14.536Z,
    __v: 0
  }
]
```

---

#### 2. Create a Job Listing
**Endpoint:** `POST /jobs/create`  
**Description:** Creates a new job listing.

**Request Body:**
```json
{
  title: 'Software developer',
  desc: 'Solve issues in full stack web app and write neat and clean code',
  budget: '91000',
  deadline: '2025-07-14',
  skillsRequired: 'MERN'
}
```

---
#### 3. Create an account
**Endpoint:** `POST /signup`  
**Description:** Creates a new account.


**Request Body:**
```json
{
    name: 'Donald Trump',
    email: 'donaldtrump@usa.com',
    password: 'starpresident2021',
    userType: 'freelancer'
}
```

---

#### 4. Login to account
**Endpoint:** `POST /login`  
**Description:** Login to your account.


**Request Body:**
```json
{
    email: 'donaldtrump@usa.com',
    password: 'starpresident2021',
}
```

**Example response **
```json
{
    message: 'Logged in sucessfully',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
}
```



### Common Errors
| **Error Code** | **Message**                    | **Description**                                    |
|----------------|--------------------------------|--------------------------------------------------|
| 401            | Unauthorized                  | Authentication is required or failed.            |
| 404            | Not Found                     | The requested resource does not exist.           |
| 500            | Internal Server Error         | An unexpected error occurred on the server.      |

---

# Authentication Flow
 
EarnWave uses **Token-Based Authentication** to secure its API. All protected routes require a valid token passed via the `Authorization` header in the request.  

**Authentication Types Supported:**  
- **Login Token:** Issued upon successful user login.
- **Bearer Token:** Used to access protected routes.

#### Flow Diagram  

https://github.com/user-attachments/assets/300093ec-b2cc-4f9c-9c39-340d442ef517

---

#### Authentication Steps  

1. **User Login**  
   **Endpoint:** `POST /login`  
   **Description:** Authenticates the user and issues a token upon successful login.  

   **Request Body:**  
   ```json
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```  

   **Response Example:**  
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "message": "Loggedin sucessfully",
   }
   ```

---

2. **Using the Token**  
   Add the token to the `Authorization` header of each API request:  
   ```
   Authorization: Bearer <your_token_here>
   ```

   Example with `curl`:  
   ```bash
   curl -X POST https://localhost:3000/jobs/create \
   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   ```

---

3. **Token Validation**  
   The server validates the token on each protected route:
   - If valid, the request proceeds.
   - If invalid or expired, the server returns an error.

   **Response Examples:**  

   - **Success (200 OK):**  
     ```json
     {
       "data": "some data",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
       "user": {
        "userId": "6788a1633ae44e3c83166115",
        "username": "Donald Trump",
       }
     }
     ```

   - **Failure (401 Unauthorized):**  
     ```json
     {
       "message": "Invalid or expired token. Please log in again.",
       "token": "undefined"
     }
     ```
---

#### Error Codes for Authentication  
| **Error Code** | **Message**              | **Description**                                |  
|----------------|--------------------------|------------------------------------------------|  
| 400            | Invalid Credentials      | The login details provided are incorrect.      |  
| 401            | Unauthorized             | The token is missing, invalid, or expired.     |  
| 403            | Forbidden                | The user does not have access to this resource.|  

---

This structured approach includes a

# Deployment
The website is live at [EarnWave - Freelancer Marketplace](https://freelancer-marketplace-ranz.onrender.com/)

- Frontend - [Render](https://render.com)
- Backend - [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
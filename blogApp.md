# blogApp - Server and Client instructions
## ReactJS
	- Blog Display
	- Comments
	- CRUD operations for Blog Users
	- Admin Dashboard Operations for Admin
	- Authentication and Login

## Features
	User Authentication
	- Allow users to register with email, username, and password.
	- Enable users to log-in securely
	- Provide password hashing for secure storage

	Blog Post Management
	- CRUD operations for blog posts
	- Each post should have a title, content, author information, and creation date
	- Implement authorization to ensure only authenticated users can create, edit, and delete their own posts.

	All Users
	- All users must be able to view all available posts.
	- All users must be able to view a single post

	Commenting System
	- All users must be able to view comments in a single post
	- Allow users to comment on each blog post
	- Comments should be able to refere to which blog post it belongs to

	Admin
	- Admin allowed to delete any posts.
	- Admin is allowed to remove any comments.

	Other requirements
	- Add appropriate error handling, response handling

## Session 86 Deliverables:
	- Backend API with CRUD
	- Backend API with Authentication
	- Readme.md for Credentials and App Description

---- 
# BlogApp API - Documentation

## Resources
- **App Base URL**:  
  - https://blogapp-api.onrender.com
- **Admin User**:  
  - Contact Admin for credentials

## Endpoints

### Users

#### [POST] - "/users/register"
- **Description**: Register a new user with an email, username, and password.
- **Sample Request Body**:
    ```json
    {
        "email": "sample@mail.com",
        "username": "sampleUser",
        "password": "samplePw123"
    }
    ```

#### [POST] - "/users/login"
- **Description**: Authenticate a user and return a JWT token.
- **Sample Request Body**:
    ```json
    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }
    ```

### Blog Posts

#### [POST] - "/posts"
- **Description**: Create a new blog post. Requires authentication.
- **Sample Request Body**:
    ```json
    {
        "title": "Sample Blog Post",
        "content": "This is a sample blog content.",
        "author": "Sample User"
    }
    ```

#### [GET] - "/posts"
- **Description**: Get all blog posts.
- **No Request Body**  

#### [GET] - "/posts/:id"
- **Description**: Get details of a single blog post by ID.
- **No Request Body**

#### [PUT] - "/posts/:id"
- **Description**: Update an existing blog post. Only the post owner can update.
- **Sample Request Body**:
    ```json
    {
        "title": "Updated Blog Post",
        "content": "This is the updated blog content."
    }
    ```

#### [DELETE] - "/posts/:id"
- **Description**: Delete a blog post. Only the post owner or admin can delete.
- **No Request Body**

### Comments

#### [POST] - "/posts/:id/comments"
- **Description**: Add a comment to a blog post. Requires authentication.
- **Sample Request Body**:
    ```json
    {
        "content": "This is a sample comment."
    }
    ```

#### [GET] - "/posts/:id/comments"
- **Description**: Get all comments for a specific blog post.
- **No Request Body**

#### [DELETE] - "/admin/comments/:id"
- **Description**: Admin can delete any comment.
- **No Request Body**

import Blog from "./models/blog.model.js";
import { connectDB } from "./utils/db.js";

// Sample blog data with real content
const blogData = [
  {
    title: "Getting Started with Node.js and Express",
    subTitle: "A comprehensive guide to building web applications with Node.js",
    body: `
        Node.js has revolutionized the way we build server-side applications. Combined with Express.js, it provides a powerful and flexible foundation for web development.

        In this tutorial, we'll explore the fundamentals of Node.js and Express, covering everything from setting up your development environment to building a fully functional web application.

        ## What is Node.js?

        Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server side, enabling full-stack JavaScript development.

        ## Why Express.js?

        Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the process of building web servers and APIs.

        ## Getting Started

        To get started with Node.js and Express, you'll need to:

        1. Install Node.js from the official website
        2. Initialize a new project with npm init
        3. Install Express using npm install express
        4. Create your first server

        ## Creating Your First Server

        Here's a simple example of an Express server:

        \`\`\`javascript
        import express from 'express'
        const app = express()
        const PORT = 3000

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        app.listen(PORT, () => {
            console.log(\`Server running on port \${PORT}\`)
        })
        \`\`\`

        This creates a basic server that responds with "Hello World!" when you visit the root URL.

        ## Conclusion

        Node.js and Express provide an excellent foundation for building modern web applications. With their event-driven, non-blocking I/O model, they're perfect for building scalable applications.
        `,
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    tags: ["nodejs", "express", "javascript", "web-development", "backend"],
    publishedAt: new Date("2024-12-15"),
  },
  {
    title: "Understanding MongoDB and Mongoose",
    subTitle: "Master database operations with MongoDB and Mongoose ODM",
    body: `
        MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. When combined with Mongoose, an Object Document Mapping (ODM) library, it becomes even more powerful for Node.js applications.

        ## What is MongoDB?

        MongoDB is a document-oriented database that stores data in BSON format (Binary JSON). Unlike traditional relational databases, MongoDB doesn't require a predefined schema, making it highly flexible for modern applications.

        ## Introducing Mongoose

        Mongoose is an ODM library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data and includes built-in type casting, validation, query building, and business logic hooks.

        ## Key Features of Mongoose

        - **Schema Definition**: Define the structure of your documents
        - **Validation**: Built-in and custom validators
        - **Middleware**: Pre and post hooks for various operations
        - **Query Building**: Powerful query API
        - **Population**: Reference documents in other collections

        ## Creating Your First Schema

        Here's an example of a simple user schema:

        \`\`\`javascript
        import mongoose from 'mongoose'

        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        })

        const User = mongoose.model('User', userSchema)
        \`\`\`

        ## Database Operations

        With Mongoose, you can perform CRUD operations easily:

        \`\`\`javascript
        // Create
        const user = new User({ name: 'John Doe', email: 'john@example.com' })
        await user.save()

        // Read
        const users = await User.find()
        const user = await User.findById(id)

        // Update
        await User.findByIdAndUpdate(id, { name: 'Jane Doe' })

        // Delete
        await User.findByIdAndDelete(id)
        \`\`\`

        ## Best Practices

        1. Always use proper validation
        2. Index frequently queried fields
        3. Use populate() wisely to avoid performance issues
        4. Handle errors properly
        5. Use transactions for related operations

        MongoDB and Mongoose together provide a powerful combination for building modern applications with flexible data requirements.
        `,
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    tags: ["mongodb", "mongoose", "database", "nodejs", "nosql"],
    publishedAt: new Date("2024-12-10"),
  },
  {
    title: "Modern JavaScript ES6+ Features",
    subTitle:
      "Explore the latest JavaScript features that will improve your code",
    body: `
        JavaScript has evolved significantly over the years, with ES6 (ECMAScript 2015) and subsequent versions introducing powerful new features that make code more readable, maintainable, and efficient.

        ## Arrow Functions

        Arrow functions provide a more concise syntax for writing functions:

        \`\`\`javascript
        // Traditional function
        function add(a, b) {
            return a + b
        }

        // Arrow function
        const add = (a, b) => a + b
        \`\`\`

        ## Template Literals

        Template literals make string interpolation much easier:

        \`\`\`javascript
        const name = 'John'
        const age = 30
        const message = \`Hello, my name is \${name} and I'm \${age} years old.\`
        \`\`\`

        ## Destructuring Assignment

        Destructuring allows you to extract values from arrays and objects:

        \`\`\`javascript
        // Array destructuring
        const [first, second] = [1, 2, 3]

        // Object destructuring
        const { name, age } = { name: 'John', age: 30, city: 'New York' }
        \`\`\`

        ## Spread and Rest Operators

        The spread operator (...) allows you to expand arrays and objects:

        \`\`\`javascript
        // Spread with arrays
        const arr1 = [1, 2, 3]
        const arr2 = [...arr1, 4, 5]

        // Spread with objects
        const obj1 = { a: 1, b: 2 }
        const obj2 = { ...obj1, c: 3 }
        \`\`\`

        ## Async/Await

        Async/await makes working with promises much more readable:

        \`\`\`javascript
        // Using promises
        fetch('/api/data')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

        // Using async/await
        async function fetchData() {
            try {
                const response = await fetch('/api/data')
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        \`\`\`

        ## Modules

        ES6 modules provide a standardized way to organize code:

        \`\`\`javascript
        // math.js
        export const add = (a, b) => a + b
        export const subtract = (a, b) => a - b

        // main.js
        import { add, subtract } from './math.js'
        \`\`\`

        ## Classes

        ES6 classes provide a cleaner syntax for object-oriented programming:

        \`\`\`javascript
        class Person {
            constructor(name, age) {
                this.name = name
                this.age = age
            }

            greet() {
                return \`Hello, I'm \${this.name}\`
            }
        }

        class Student extends Person {
            constructor(name, age, grade) {
                super(name, age)
                this.grade = grade
            }
        }
        \`\`\`

        These modern JavaScript features help write cleaner, more maintainable code and are essential for any JavaScript developer.
        `,
    thumbnail:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
    tags: ["javascript", "es6", "frontend", "programming", "web-development"],
    publishedAt: new Date("2024-12-20"),
  },
  {
    title: "Building RESTful APIs with Express",
    subTitle: "Learn how to create robust and scalable REST APIs",
    body: `
        REST (Representational State Transfer) is an architectural style for designing networked applications. Building RESTful APIs with Express.js provides a solid foundation for creating scalable web services.

        ## What is REST?

        REST is an architectural style that defines a set of constraints for creating web services. RESTful APIs use HTTP methods to perform operations on resources identified by URLs.

        ## HTTP Methods in REST

        - **GET**: Retrieve data from the server
        - **POST**: Create new resources
        - **PUT**: Update existing resources (complete update)
        - **PATCH**: Partial update of resources
        - **DELETE**: Remove resources

        ## Setting up Express for REST API

        First, let's set up a basic Express server:

        \`\`\`javascript
        import express from 'express'
        import cors from 'cors'

        const app = express()

        // Middleware
        app.use(express.json())
        app.use(cors())

        // Routes
        app.use('/api/users', userRoutes)
        app.use('/api/posts', postRoutes)

        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(\`Server running on port \${PORT}\`)
        })
        \`\`\`

        ## Creating RESTful Routes

        Here's an example of RESTful routes for a user resource:

        \`\`\`javascript
        import express from 'express'
        const router = express.Router()

        // GET /api/users - Get all users
        router.get('/', async (req, res) => {
            try {
                const users = await User.find()
                res.json(users)
            } catch (error) {
                res.status(500).json({ error: error.message })
            }
        })

        // GET /api/users/:id - Get a specific user
        router.get('/:id', async (req, res) => {
            try {
                const user = await User.findById(req.params.id)
                if (!user) {
                    return res.status(404).json({ error: 'User not found' })
                }
                res.json(user)
            } catch (error) {
                res.status(500).json({ error: error.message })
            }
        })

        // POST /api/users - Create a new user
        router.post('/', async (req, res) => {
            try {
                const user = new User(req.body)
                await user.save()
                res.status(201).json(user)
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        // PUT /api/users/:id - Update a user
        router.put('/:id', async (req, res) => {
            try {
                const user = await User.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true, runValidators: true }
                )
                if (!user) {
                    return res.status(404).json({ error: 'User not found' })
                }
                res.json(user)
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        // DELETE /api/users/:id - Delete a user
        router.delete('/:id', async (req, res) => {
            try {
                const user = await User.findByIdAndDelete(req.params.id)
                if (!user) {
                    return res.status(404).json({ error: 'User not found' })
                }
                res.json({ message: 'User deleted successfully' })
            } catch (error) {
                res.status(500).json({ error: error.message })
            }
        })

        export default router
        \`\`\`

        ## Best Practices

        1. **Use proper HTTP status codes**
        2. **Implement proper error handling**
        3. **Use middleware for common functionality**
        4. **Validate input data**
        5. **Implement authentication and authorization**
        6. **Use pagination for large datasets**
        7. **Document your API**

        ## Error Handling

        Implement centralized error handling:

        \`\`\`javascript
        const errorHandler = (err, req, res, next) => {
            const statusCode = err.statusCode || 500
            res.status(statusCode).json({
                error: err.message,
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
            })
        }

        app.use(errorHandler)
        \`\`\`

        Building RESTful APIs with Express provides a solid foundation for creating scalable and maintainable web services.
        `,
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    tags: ["express", "rest-api", "nodejs", "backend", "web-development"],
    publishedAt: new Date("2024-12-05"),
  },
  {
    title: "React Hooks: A Complete Guide",
    subTitle: "Master React Hooks and transform your functional components",
    body: `
        React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components. This guide covers the most important hooks and their use cases.

        ## What are React Hooks?

        Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8 and have since become the preferred way of writing React components.

        ## useState Hook

        The useState hook allows you to add state to functional components:

        \`\`\`javascript
        import React, { useState } from 'react'

        function Counter() {
            const [count, setCount] = useState(0)

            return (
                <div>
                    <p>You clicked {count} times</p>
                    <button onClick={() => setCount(count + 1)}>
                        Click me
                    </button>
                </div>
            )
        }
        \`\`\`

        ## useEffect Hook

        useEffect lets you perform side effects in functional components:

        \`\`\`javascript
        import React, { useState, useEffect } from 'react'

        function UserProfile({ userId }) {
            const [user, setUser] = useState(null)
            const [loading, setLoading] = useState(true)

            useEffect(() => {
                async function fetchUser() {
                    try {
                        const response = await fetch(\`/api/users/\${userId}\`)
                        const userData = await response.json()
                        setUser(userData)
                    } catch (error) {
                        console.error('Error fetching user:', error)
                    } finally {
                        setLoading(false)
                    }
                }

                fetchUser()
            }, [userId]) // Dependency array

            if (loading) return <div>Loading...</div>

            return (
                <div>
                    <h1>{user?.name}</h1>
                    <p>{user?.email}</p>
                </div>
            )
        }
        \`\`\`

        ## useContext Hook

        useContext provides a way to pass data through the component tree without prop drilling:

        \`\`\`javascript
        import React, { createContext, useContext, useState } from 'react'

        const ThemeContext = createContext()

        function ThemeProvider({ children }) {
            const [theme, setTheme] = useState('light')

            return (
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    {children}
                </ThemeContext.Provider>
            )
        }

        function ThemedButton() {
            const { theme, setTheme } = useContext(ThemeContext)

            return (
                <button
                    style={{
                        backgroundColor: theme === 'light' ? '#fff' : '#333',
                        color: theme === 'light' ? '#333' : '#fff'
                    }}
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                    Toggle Theme
                </button>
            )
        }
        \`\`\`

        ## useReducer Hook

        useReducer is useful for managing complex state logic:

        \`\`\`javascript
        import React, { useReducer } from 'react'

        const initialState = { count: 0 }

        function reducer(state, action) {
            switch (action.type) {
                case 'increment':
                    return { count: state.count + 1 }
                case 'decrement':
                    return { count: state.count - 1 }
                case 'reset':
                    return initialState
                default:
                    throw new Error()
            }
        }

        function Counter() {
            const [state, dispatch] = useReducer(reducer, initialState)

            return (
                <div>
                    Count: {state.count}
                    <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                    <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
                    <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
                </div>
            )
        }
        \`\`\`

        ## Custom Hooks

        You can create your own hooks to reuse stateful logic:

        \`\`\`javascript
        import { useState, useEffect } from 'react'

        function useFetch(url) {
            const [data, setData] = useState(null)
            const [loading, setLoading] = useState(true)
            const [error, setError] = useState(null)

            useEffect(() => {
                async function fetchData() {
                    try {
                        setLoading(true)
                        const response = await fetch(url)
                        const result = await response.json()
                        setData(result)
                    } catch (err) {
                        setError(err)
                    } finally {
                        setLoading(false)
                    }
                }

                fetchData()
            }, [url])

            return { data, loading, error }
        }

        // Usage
        function UserList() {
            const { data: users, loading, error } = useFetch('/api/users')

            if (loading) return <div>Loading...</div>
            if (error) return <div>Error: {error.message}</div>

            return (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )
        }
        \`\`\`

        ## Hook Rules

        1. Only call hooks at the top level
        2. Only call hooks from React functions
        3. Use the ESLint plugin for hooks

        React Hooks provide a powerful and flexible way to add state and side effects to functional components, making your code more reusable and easier to test.
        `,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    tags: ["react", "hooks", "javascript", "frontend", "web-development"],
    publishedAt: new Date("2024-12-25"),
  },
  {
    title: "Docker for Developers: Complete Guide",
    subTitle: "Learn containerization and streamline your development workflow",
    body: `
        Docker has revolutionized how we develop, ship, and run applications. By containerizing applications, Docker ensures they run consistently across different environments, from development to production.

        ## What is Docker?

        Docker is a platform that uses containerization technology to package applications and their dependencies into lightweight, portable containers. These containers can run consistently on any system that supports Docker.

        ## Key Concepts

        ### Images
        Docker images are read-only templates used to create containers. They contain the application code, runtime, system tools, libraries, and settings needed to run an application.

        ### Containers
        Containers are running instances of Docker images. They are isolated processes that share the host OS kernel but have their own filesystem, network, and process space.

        ### Dockerfile
        A Dockerfile is a text file containing instructions to build a Docker image.

        ## Your First Dockerfile

        Here's a simple Dockerfile for a Node.js application:

        \`\`\`dockerfile
        # Use official Node.js runtime as base image
        FROM node:18-alpine

        # Set working directory in container
        WORKDIR /app

        # Copy package.json and package-lock.json
        COPY package*.json ./

        # Install dependencies
        RUN npm ci --only=production

        # Copy application code
        COPY . .

        # Expose port
        EXPOSE 3000

        # Define command to run application
        CMD ["npm", "start"]
        \`\`\`

        ## Building and Running Images

        \`\`\`bash
        # Build an image
        docker build -t my-app .

        # Run a container
        docker run -p 3000:3000 my-app

        # Run in background
        docker run -d -p 3000:3000 --name my-app-container my-app

        # View running containers
        docker ps

        # Stop a container
        docker stop my-app-container

        # Remove a container
        docker rm my-app-container
        \`\`\`

        ## Docker Compose

        Docker Compose allows you to define and run multi-container applications:

        \`\`\`yaml
        version: '3.8'

        services:
          app:
            build: .
            ports:
              - "3000:3000"
            environment:
              - NODE_ENV=development
            volumes:
              - .:/app
              - /app/node_modules
            depends_on:
              - database

          database:
            image: mongo:5
            ports:
              - "27017:27017"
            environment:
              - MONGO_INITDB_ROOT_USERNAME=admin
              - MONGO_INITDB_ROOT_PASSWORD=password
            volumes:
              - mongo-data:/data/db

        volumes:
          mongo-data:
        \`\`\`

        ## Common Docker Commands

        \`\`\`bash
        # Images
        docker images                 # List images
        docker rmi image-name        # Remove image
        docker pull image-name       # Download image

        # Containers
        docker ps                    # List running containers
        docker ps -a                 # List all containers
        docker logs container-name   # View container logs
        docker exec -it container-name bash  # Access container shell

        # Docker Compose
        docker-compose up            # Start services
        docker-compose up -d         # Start in background
        docker-compose down          # Stop and remove services
        docker-compose logs          # View logs
        \`\`\`

        ## Best Practices

        ### 1. Use Multi-stage Builds
        \`\`\`dockerfile
        # Build stage
        FROM node:18-alpine AS builder
        WORKDIR /app
        COPY package*.json ./
        RUN npm ci
        COPY . .
        RUN npm run build

        # Production stage
        FROM node:18-alpine AS production
        WORKDIR /app
        COPY package*.json ./
        RUN npm ci --only=production
        COPY --from=builder /app/dist ./dist
        CMD ["npm", "start"]
        \`\`\`

        ### 2. Use .dockerignore
        \`\`\`
        node_modules
        npm-debug.log
        .git
        .gitignore
        README.md
        .env
        coverage
        .nyc_output
        \`\`\`

        ### 3. Optimize Layer Caching
        - Copy package.json before source code
        - Install dependencies before copying source
        - Use specific base image tags

        ### 4. Security Best Practices
        - Use official base images
        - Don't run as root user
        - Scan images for vulnerabilities
        - Keep images up to date

        ## Development Workflow

        1. **Development**: Use volumes to mount source code
        2. **Testing**: Run tests in containers
        3. **Building**: Create production images
        4. **Deployment**: Deploy containers to production

        Docker streamlines the development workflow and ensures consistency across all environments, making it an essential tool for modern development teams.
        `,
    thumbnail:
      "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800&h=400&fit=crop",
    tags: ["docker", "containerization", "devops", "deployment", "development"],
    publishedAt: null, // Draft blog
  },
  {
    title: "GraphQL vs REST: Choosing the Right API",
    subTitle: "Compare GraphQL and REST to make informed API design decisions",
    body: `
        When building APIs, developers often face the choice between GraphQL and REST. Both have their strengths and use cases. This comprehensive comparison will help you make an informed decision.

        ## What is REST?

        REST (Representational State Transfer) is an architectural style for designing networked applications. It uses standard HTTP methods and is stateless, cacheable, and has a uniform interface.

        ### REST Characteristics:
        - **Stateless**: Each request contains all information needed
        - **Resource-based**: URLs represent resources
        - **HTTP methods**: GET, POST, PUT, DELETE, PATCH
        - **Multiple representations**: JSON, XML, HTML

        ## What is GraphQL?

        GraphQL is a query language and runtime for APIs. It provides a complete description of the data in your API and gives clients the power to ask for exactly what they need.

        ### GraphQL Characteristics:
        - **Single endpoint**: All requests go to one URL
        - **Flexible queries**: Clients specify exactly what data they need
        - **Strong type system**: Schema defines API capabilities
        - **Real-time subscriptions**: Built-in support for live data

        ## REST Example

        \`\`\`javascript
        // Express.js REST API
        app.get('/api/users/:id', async (req, res) => {
            const user = await User.findById(req.params.id)
            res.json(user)
        })

        app.get('/api/users/:id/posts', async (req, res) => {
            const posts = await Post.find({ userId: req.params.id })
            res.json(posts)
        })

        // Client requests
        fetch('/api/users/123')
        fetch('/api/users/123/posts')
        \`\`\`

        ## GraphQL Example

        \`\`\`javascript
        // GraphQL schema
        const typeDefs = \`
            type User {
                id: ID!
                name: String!
                email: String!
                posts: [Post!]!
            }

            type Post {
                id: ID!
                title: String!
                content: String!
                author: User!
            }

            type Query {
                user(id: ID!): User
                users: [User!]!
            }
        \`

        // Resolver
        const resolvers = {
            Query: {
                user: (_, { id }) => User.findById(id),
                users: () => User.find()
            },
            User: {
                posts: (user) => Post.find({ userId: user.id })
            }
        }

        // Client query
        query {
            user(id: "123") {
                name
                email
                posts {
                    title
                    content
                }
            }
        }
        \`\`\`

        ## Comparison

        ### Data Fetching

        **REST:**
        - Multiple requests for related data
        - Over-fetching (getting unnecessary data)
        - Under-fetching (need additional requests)

        **GraphQL:**
        - Single request for all needed data
        - Exact data specification
        - Efficient data loading

        ### Caching

        **REST:**
        - HTTP caching works well
        - Easy to cache with CDNs
        - Predictable cache keys

        **GraphQL:**
        - More complex caching
        - Requires specialized solutions
        - Query-based cache invalidation

        ### Learning Curve

        **REST:**
        - Familiar to most developers
        - Well-established patterns
        - Extensive tooling

        **GraphQL:**
        - Steeper learning curve
        - New concepts to learn
        - Growing ecosystem

        ### Performance

        **REST:**
        - Simple requests are fast
        - Multiple round trips for complex data
        - Efficient for simple use cases

        **GraphQL:**
        - Single round trip for complex data
        - Potential N+1 query problems
        - Requires careful optimization

        ## When to Use REST

        Choose REST when:
        - Building simple CRUD applications
        - Team is familiar with REST
        - Caching is crucial
        - You need file uploads/downloads
        - Working with existing REST infrastructure

        ### REST Advantages:
        - Simple and familiar
        - Great caching support
        - Wide tool support
        - Easy to understand and debug
        - HTTP status codes for error handling

        ## When to Use GraphQL

        Choose GraphQL when:
        - Frontend needs vary significantly
        - Mobile apps need efficient data loading
        - Rapid frontend development is important
        - You have complex, interconnected data
        - Real-time features are needed

        ### GraphQL Advantages:
        - Flexible data fetching
        - Strong type system
        - Great developer experience
        - Introspection and documentation
        - Real-time subscriptions

        ## Hybrid Approach

        You can also use both:
        - GraphQL for complex queries
        - REST for simple operations
        - REST for file uploads
        - GraphQL for real-time features

        ## Code Example: Converting REST to GraphQL

        \`\`\`javascript
        // REST endpoints
        GET /api/users/123
        GET /api/users/123/posts
        GET /api/posts/456/comments

        // Equivalent GraphQL query
        query {
            user(id: "123") {
                id
                name
                posts {
                    id
                    title
                    comments {
                        id
                        content
                        author {
                            name
                        }
                    }
                }
            }
        }
        \`\`\`

        ## Conclusion

        Both GraphQL and REST are valuable tools. REST remains excellent for simple APIs and when caching is crucial. GraphQL shines when you need flexible data fetching and have complex frontend requirements.

        Consider your team's expertise, project requirements, and long-term maintenance when making the decision. Many successful applications use a hybrid approach, leveraging the strengths of both technologies.
        `,
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    tags: ["graphql", "rest", "api", "web-development", "backend"],
    publishedAt: null, // Draft blog
  },
];

// Function to seed the database
const seedBlogs = async () => {
  try {
    await Blog.deleteMany({});
    console.log("Existing blogs cleared");

    const blogs = await Blog.insertMany(blogData);
    console.log(`${blogs.length} blogs seeded successfully`);

    const blogsToPublish = blogs.filter((blog) => blog.publishedAt);
    for (const blog of blogsToPublish) {
      await blog.save();
    }

    console.log(`${blogsToPublish.length} blogs published`);
    console.log(
      `${blogs.length - blogsToPublish.length} blogs saved as drafts`
    );

    // Display summary
    console.log("\n--- Seeding Summary ---");
    console.log(`Total blogs created: ${blogs.length}`);
    console.log(`Published blogs: ${blogsToPublish.length}`);
    console.log(`Draft blogs: ${blogs.length - blogsToPublish.length}`);

    console.log("\n--- Sample Blog Titles ---");
    blogs.forEach((blog, index) => {
      const status = blog.publishedAt ? "✅ Published" : "📝 Draft";
      console.log(`${index + 1}. ${blog.title} ${status}`);
    });
  } catch (error) {
    console.error("Error seeding blogs:", error);
  }
};

// Main function
const main = async () => {
  await connectDB();
  await seedBlogs();

  console.log("\n🎉 Seeding completed successfully!");
  console.log("You can now start your application and view the blogs.");

  process.exit(0);
};

// Run the seeder
main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});

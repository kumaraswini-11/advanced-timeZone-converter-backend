# Play Power Backend Project

Tech stack (Prerequisite) Node.js Express.js Prisma PostgreSQL Docker

Build: docker build -t yourusername/yourimagename .
Push: docker push yourusername/yourimagename

docker build -t your-dockerhub-username/student-assignments-app .
`Log in to Docker Hub: docker login`
docker push your-dockerhub-username/student-assignments-app

Running the Docker Container: You can run the Docker container locally to test it.
docker run -p 3000:3000 --env-file .env your-dockerhub-username/student-assignments-app

```js
backend_assignment/
├── node_modules
├── prisma/
│   └── schema.prisma
├── docs/
│   └── postman_colection
├── src/
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   └── assignment.controllers.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── assignment.routes.js
│   │   └── index.routes.js
│   ├── utils/
│   │   └── jwt.js
│   └── app.js
│   └── index.js
├── .env
├── .env.sample
├── .gitignore
├── .prettierrc
├── .dockerignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

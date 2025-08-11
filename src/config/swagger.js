// src/config/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RWorld Backend API",
      version: "1.0.0",
      description: "API documentation for RWorld backend",
    },
    tags: [
      {
        name: "Auth",
        description: "Authentication APIs",
      },
      {
        name: "Enquiries",
        description: "Enquiry management APIs",
      },
    ],
    servers: [
      {
        url: "http://localhost:5000", // or your deployed URL
      },
    ],
  },
  apis: ["./src/routes/*.js"], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

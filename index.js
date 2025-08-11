const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const basicAuth = require("express-basic-auth");

const connectDb = require("./src/config/db.config");
const swaggerSpec = require("./src/config/swagger");
const authRouter = require("./src/routes/auth.route");
const enquiryRouter = require("./src/routes/enquiry.route");
const blogRouter = require("./src/routes/blog.route");
const stockEnquiryRouter = require("./src/routes/stockEnquiry.route");

dotenv.config();
connectDb();

const app = express();

const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:5173",
  "https://stockit.rworldsoftware.in",
  "https://r-world.vercel.app",
  "https://stock-it.in",
  "https://www.stock-it.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(cleanOrigin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/api-docs",
  basicAuth({
    users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASS },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/auth", authRouter);
app.use("/api/enquiry", enquiryRouter);
app.use("/api/stock-enquiry", stockEnquiryRouter);
app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});


import express from "express";
import visionRoutes from "./routes/visionRoutes.js";
import productRoute from "./routes/productRoute.js";
import DbproductRoute from "./routes/DbproductRoute.js";
import brandRoute from "./routes/brandRoute.js";
import DbbrandRoute from "./routes/DbbrandRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import catRoute from "./routes/catRoute.js";
import DbcatRoute from "./routes/DbcatRoute.js";
import passport from "passport";
import "./passport.js";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db2.js";
import cors from "cors";
import MongoStore from "connect-mongo";
import authRoute from "./routes/authRoute.js";
import DbauthRoute from "./routes/DbauthRoute.js";
import DbcartRoute from "./routes/DbcartRoute.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json({ limit: "50mb" })); // ✅ 50mb is enough
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:3004",
  "http://localhost:5173",
  "https://diyere.vercel.app",
  "https://faclothing.vercel.app",
  "https://faclothing-admin.vercel.app",
  "https://admin.rayofaa.com",
  "https://www.rayofaa.com",
  "https://rayofaa.com",
  "https://dashboard.diyere.com",
  "https://dbwearsadmin.vercel.app",
  "https://dbwears.vercel.app",
  "https://diyereadmin.vercel.app",
  "https://admin.diyere.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / Postman

    if (allowedOrigins.includes(origin)) {
      callback(null, origin); // 👈 return EXACT origin
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-Key", "X-Api-Key"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api", authRoute);
app.use("/api/db", DbauthRoute);
app.use("/api", visionRoutes);
app.use("/api", productRoute);
app.use("/api/db", DbproductRoute);
app.use("/api/db", paymentRoute);
app.use("/api", catRoute);
app.use("/api/db", DbcatRoute);
app.use("/api", brandRoute);
app.use("/api/db", DbbrandRoute);
app.use("/api/db", DbcartRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

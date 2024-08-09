import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRouter from "./src/routes/auth.route.mjs";
import { protect } from "./src/middlewares/protect.middleware.mjs";
import dotenv from "dotenv";
import paymentRouter from "./src/routes/payment.route.mjs";
import serviceRouter from "./src/routes/service.route.mjs";
import orderRouter from "./src/routes/order.route.mjs";
import promotionRouter from "./src/routes/promotion.route.mjs";
import ViewServiceRouter from "./src/routes/view-service.route.mjs";
import updateServiceRouter from "./src/routes/fix-service.route.mjs";
import deleteServiceRoute from "./src/routes/delete-route.mjs";
import createServices from "./src/routes/create-service.route.mjs";
import categoriesRouter from "./src/routes/categories.router.mjs";
import adminPromotionRouter from "./src/routes/admin-promotion.route.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url); //รูป
const __dirname = dirname(__filename); // รูป

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/service", serviceRouter);
app.use(protect);
app.use("/promotions/admin", adminPromotionRouter);
app.use("/promotions", promotionRouter);
app.use("/payment", paymentRouter);
app.use("/service", createServices);
app.use("/service", ViewServiceRouter);
app.use("/service", updateServiceRouter);
app.use("/service", deleteServiceRoute);
app.use("/orders", orderRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //รูป
app.use("/categories", categoriesRouter);

app.get("*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

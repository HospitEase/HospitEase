import { Hono } from "hono";
import { userRoute } from "./routes/userroute";
import { adminRoute } from "./routes/adminRoute";
import { patientRouter } from "./routes/patientRoute";
import { hospitalRouter } from "./routes/hospitalRoutes";
import { cors } from "hono/cors";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use("/home/*", cors());
app.route("/home", userRoute);
app.route("/home", adminRoute);
app.route("/home", patientRouter);
app.route("/home", hospitalRouter);

export default app;

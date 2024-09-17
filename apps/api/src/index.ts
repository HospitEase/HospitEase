import { Hono } from "hono";
import { userRoute } from "./routes/userroute";
import { adminRoute } from "./routes/adminRoute";
import { patientRouter } from "./routes/patientRoute";
import { hospitalRouter } from "./routes/hospitalRoutes";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/home", userRoute);
app.route("/home", adminRoute);
app.route("/home", patientRouter);
app.route("/home", hospitalRouter);

export default app;

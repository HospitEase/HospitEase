import { Hono } from "hono";
import { userRoute } from "./routes/userroute";
import { adminRoute } from "./routes/adminRoute";
import patientRoute from "./routes/patientRoute";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/home", userRoute);
app.route("/home", adminRoute);
app.route("/home", patientRoute);

export default app;

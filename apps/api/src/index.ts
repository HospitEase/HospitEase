import { Hono } from "hono";
import { userRoute } from "./routes/userroute";
import { adminRoute } from "./routes/adminRoute";
import { patientRoutes } from "./routes/patientRoute";
import { hospitalRouter } from "./routes/hospitalRoutes";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/home/*", cors());

// Example route for sending a notification
app.post("/send-notification", async (c) => {
  try {
    const { to, message } = await c.req.json(); // Expecting JSON with to and message

    if (!to || !message) {
      return c.json({ error: "Missing to or message field" }, { status: 400 });
    }

    return c.json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Failed to send notification:", error);
    return c.json({ error: "Failed to send notification" }, { status: 500 });
  }
});

// Existing routes
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use("/home/*", cors());
app.route("/home", userRoute);
app.route("/home", adminRoute);
app.route("/home", patientRoutes);
app.route("/home", hospitalRouter);

export default app;

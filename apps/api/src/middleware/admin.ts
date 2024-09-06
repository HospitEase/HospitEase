import { Hono, Context, Next } from "hono";
import { verify, sign, decode } from "hono/jwt";

export async function adminMiddleware(c: Context, next: Next) {
  const token = c.req.header("authorization") || "";

  if (!token) {
    c.status(403);
    return c.json({ msg: "Invalid token" });
  }

  try {
    const user = await verify(token, c.env.JWT_KEY);

    if (user.adminId) {
      c.set("adminId", user.adminId);
      await next();
    } else {
      return c.json({ msg: "Invalid credentials" });
    }
  } catch (err) {
    c.status(500);
    return c.json({ msg: "error while hiting this route" });
  }
}

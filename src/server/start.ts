import app from "./hono-server";

const port = Number(process.env.PORT || 3000);

export default {
  port,
};

// Hono on Node (standalone) using standard fetch adapter
// eslint-disable-next-line unicorn/prefer-top-level-await
app.fire?.();

// If running under Node 18+, we can listen via serve if needed
// But Hono provides app.fire() for quickstart in dev



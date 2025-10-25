import { Hono } from "hono";
import { cors } from "hono/cors";
import { RPCHandler } from "@orpc/server/fetch";
import { router } from "./orpc-router";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Merkle DAG note: node=hono-server, depends on orpc-router and dist artifacts

const app = new Hono();

app.use("*", cors());

// /rpc endpoint - oRPC handler bound to Fetch adapter
const rpcHandler = new RPCHandler(router, {});
app.all("/rpc", async (c) => {
  const result = await rpcHandler.handle(c.req.raw);
  if (!result.matched || !result.response) {
    return c.text("No procedure matched", 404);
  }
  return result.response;
});

// Content negotiation for /dodaf
app.get("/dodaf", async (c) => {
  const accept = c.req.header("accept") || "";

  const base = process.cwd();
  const root = join(base, "dist");

  let file = "index.html";
  let type = "text/html; charset=utf-8";

  if (accept.includes("application/ld+json")) {
    file = "dodaf-context.json"; // context as JSON-LD representation
    type = "application/ld+json";
  } else if (accept.includes("text/turtle")) {
    file = "dodaf.owl.ttl";
    type = "text/turtle; charset=utf-8";
  }

  try {
    const buf = await readFile(join(root, file));
    c.header("Content-Type", type);
    c.header("Vary", "Accept");
    c.header("Access-Control-Allow-Origin", "*");
    c.header(
      "Cache-Control",
      file === "index.html"
        ? "public, max-age=0, s-maxage=600, stale-while-revalidate=86400"
        : "public, max-age=0, s-maxage=31536000, immutable",
    );
    return new Response(new Uint8Array(buf), {
      headers: {
        'Content-Type': type,
        'Cache-Control': file === "index.html"
          ? "public, max-age=0, s-maxage=600, stale-while-revalidate=86400"
          : "public, max-age=0, s-maxage=31536000, immutable",
      },
    });
  } catch {
    return c.text("Not Found", 404);
  }
});

// Explicit versioned static endpoints (optional convenience)
app.get("/dodaf/v1/owl", async (c) => {
  const buf = await readFile(join(process.cwd(), "dist", "dodaf.owl.ttl"));
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "text/turtle; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
});

app.get("/dodaf/v1/shapes", async (c) => {
  const buf = await readFile(join(process.cwd(), "dist", "dodaf.shapes.ttl"));
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "text/turtle; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
});

app.get("/dodaf/v1/context", async (c) => {
  const buf = await readFile(join(process.cwd(), "dist", "dodaf-context.json"));
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/ld+json",
      "Cache-Control": "public, max-age=0, s-maxage=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
});

export default app;



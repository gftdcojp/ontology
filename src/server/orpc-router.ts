import { os, ORPCError } from "@orpc/server";
import { z } from "zod";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Merkle DAG note: node=orpc-router, depends on dist artifacts generation

const VersionSchema = z
  .object({
    version: z.string().default("v1"),
  })
  .optional();

const formatHeader = (format: string): string => {
  switch (format) {
    case "ttl":
      return "text/turtle; charset=utf-8";
    case "jsonld":
      return "application/ld+json";
    case "html":
      return "text/html; charset=utf-8";
    default:
      return "application/octet-stream";
  }
};

async function loadArtifact(filename: string): Promise<Buffer> {
  const base = process.cwd();
  // Dist artifacts are source of truth; mirror/public can be added later
  const distPath = join(base, "dist", filename);
  try {
    return await readFile(distPath);
  } catch {
    throw new ORPCError("NOT_FOUND", {
      message: `Artifact not found: ${filename}`,
    });
  }
}

export const getOwl = os
  .input(VersionSchema)
  .handler(async ({ input }) => {
    const version = input?.version ?? "v1";
    const buf = await loadArtifact("dodaf.owl.ttl");
    return {
      version,
      contentType: formatHeader("ttl"),
      body: buf.toString("utf-8"),
    };
  });

export const getShapes = os
  .input(VersionSchema)
  .handler(async ({ input }) => {
    const version = input?.version ?? "v1";
    const buf = await loadArtifact("dodaf.shapes.ttl");
    return {
      version,
      contentType: formatHeader("ttl"),
      body: buf.toString("utf-8"),
    };
  });

export const getContext = os
  .input(VersionSchema)
  .handler(async ({ input }) => {
    const version = input?.version ?? "v1";
    const buf = await loadArtifact("dodaf-context.json");
    return {
      version,
      contentType: formatHeader("jsonld"),
      body: buf.toString("utf-8"),
    };
  });

export const router = {
  ontology: {
    owl: getOwl,
    shapes: getShapes,
    context: getContext,
  },
};

export type ORPCRouter = typeof router;



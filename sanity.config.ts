"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./lib/sanity/env";

export default defineConfig({
  name: "default",
  title: "MSL Biotech Admin",
  basePath: "/admin",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

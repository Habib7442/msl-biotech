"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/lib/sanity/env";

export default function StudioClient() {
  if (!isSanityConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#12213F] px-6 text-white">
        <div className="max-w-md text-center">
          <h1 className="font-heading text-xl font-bold mb-3">Sanity Studio Not Configured</h1>
          <p className="text-sm text-white/70 leading-relaxed">
            Run <code className="bg-white/10 px-1.5 py-0.5 rounded">npx sanity login</code> and{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded">npx sanity init</code> to create a project, then set{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded">NEXT_PUBLIC_SANITY_DATASET</code> in{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded">.env.local</code> (see{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded">.env.local.example</code>).
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
  form: string;
}

export default function ProductGallery({ images, name, form }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full max-w-[420px] flex flex-col gap-4">
      <div className="w-full aspect-square rounded-[32px] bg-gradient-to-br from-primary/10 to-[#7FC700]/10 p-3 relative shadow-md border border-gray-50/50 overflow-hidden">
        <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-white">
          <Image
            src={images[active]}
            alt={`${name} - ${form} packaging`}
            fill
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-contain p-6 [filter:brightness(1.1)_contrast(1.12)_saturate(1.2)]"
            priority
          />
        </div>
        <span className="absolute bottom-6 right-6 rounded-full bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
          {form}
        </span>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 justify-center">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => setActive(idx)}
              aria-label={`Show image ${idx + 1} of ${name}`}
              aria-pressed={active === idx}
              className={cn(
                "size-16 rounded-xl overflow-hidden border-2 bg-white relative shrink-0 transition-all cursor-pointer",
                active === idx ? "border-primary" : "border-gray-100 hover:border-primary/40"
              )}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1.5 [filter:brightness(1.1)_contrast(1.12)_saturate(1.2)]"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

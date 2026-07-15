import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Check, 
  AlertTriangle, 
  Award, 
  ChevronRight, 
  Package, 
  Layers, 
  Thermometer, 
  ExternalLink 
} from "lucide-react";
import { PRODUCTS, Product } from "@/lib/data";
import EnquiryButton from "@/components/EnquiryButton";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    id: prod.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | MSL Biotech",
    };
  }

  return {
    title: `${product.name} | MSL Biotech`,
    description: `Read compositions, packaging details, and therapeutic indications for ${product.name}. Medicine Save Life.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current product)
  let related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  // Fallback to general products if none are in the same category
  if (related.length === 0) {
    related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  }

  const waPrefill = `Hello MSL Biotech, I'd like to enquire about ${product.name} (Composition: ${product.composition}).`;
  const waLink = `https://wa.me/919999999999?text=${encodeURIComponent(waPrefill)}`;

  return (
    <div className="w-full">
      {/* Subpage Navigation Bar */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="size-3" />
              <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              <ChevronRight className="size-3" />
              <span className="text-brand-navy truncate max-w-[200px]">{product.name}</span>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors w-fit"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Products</span>
            </Link>

          </div>
        </div>
      </section>

      {/* Main Details Panel */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Visual container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[420px] aspect-square rounded-[32px] bg-gradient-to-br from-primary/10 to-[#7FC700]/10 p-6 flex items-center justify-center relative shadow-md border border-gray-50/50">
                <div className="size-20 rounded-full bg-white flex items-center justify-center shadow-md">
                  <Award className="size-10 text-primary" />
                </div>
                <span className="absolute bottom-6 right-6 rounded-full bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                  {product.form}
                </span>
              </div>
            </div>

            {/* Right Column: Information Panel */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              
              <div>
                <span className="inline-flex items-center rounded-full bg-[#EAF4DA] px-3.5 py-1 text-xs font-semibold text-brand-navy mb-3 uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-navy mb-2 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-gray-400 text-sm italic font-medium">
                  Composition: {product.composition}
                </p>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-gray-100 py-6 my-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F4F7FB] text-primary shrink-0">
                    <Layers className="size-4" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dosage Form</h5>
                    <p className="text-xs font-bold text-brand-navy">{product.form}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F4F7FB] text-primary shrink-0">
                    <Package className="size-4" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Packaging Size</h5>
                    <p className="text-xs font-bold text-brand-navy">{product.packaging}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F4F7FB] text-primary shrink-0">
                    <Thermometer className="size-4" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Storage Rules</h5>
                    <p className="text-xs font-bold text-brand-navy truncate max-w-[140px]" title={product.storage}>
                      {product.storage}
                    </p>
                  </div>
                </div>
              </div>

              {/* Indications section */}
              <div>
                <h4 className="font-heading text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">
                  Therapeutic Indications
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.indications.map((ind, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                      <div className="size-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-3 text-[#7FC700]" />
                      </div>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <EnquiryButton productName={product.name} className="w-full sm:w-auto" />
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold py-3.5 px-8 rounded-xl text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="size-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.008c6.56 0 11.9-5.336 11.902-11.894a11.864 11.864 0 00-3.481-8.413z"/>
                  </svg>
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>

              {/* Compliance disclaimer box */}
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 mt-6 flex items-start gap-3">
                <AlertTriangle className="size-5 text-red-500 shrink-0 mt-0.5" />
                <div className="text-[11px] text-red-700 leading-normal font-medium">
                  <span className="font-bold block uppercase tracking-wider mb-1 text-red-800">Prescription Disclaimer</span>
                  This product is for informational purposes only. Dosage and formulation schedules must be overseen by a registered medical practitioner. Do not self-medicate.
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Related products listing */}
      <section className="bg-[#F4F7FB] py-16 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <h3 className="font-heading text-xl font-bold text-brand-navy mb-8 text-left uppercase tracking-wider">
            Related Formulations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] hover:shadow-[0_15px_35px_rgba(18,33,63,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="rounded-full bg-[#EAF4DA] px-2.5 py-0.5 text-[9px] font-bold text-brand-navy uppercase tracking-wider w-fit block mb-4">
                    {prod.category}
                  </span>
                  <h4 className="font-heading text-sm font-bold text-brand-navy group-hover:text-primary transition-colors mb-1">
                    {prod.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 italic mb-4 truncate">
                    Composition: {prod.composition}
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <Link
                    href={`/products/${prod.id}`}
                    className="w-full text-center border border-gray-100 hover:border-primary/20 hover:bg-primary/5 text-brand-navy font-bold py-2.5 rounded-xl text-[10px] transition-colors"
                  >
                    View details
                  </Link>
                  <EnquiryButton productName={prod.name} variant="secondary" className="w-full" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

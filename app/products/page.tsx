"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, RotateCcw, ArrowRight, Award, Plus, Check } from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial values from URL query parameters
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync category and search query states with URL parameters
  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }
  }, [categoryParam, searchParam]);

  const updateFilters = (category: string, search: string) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (search.trim()) params.set("search", search);
    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    updateFilters(category, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateFilters(activeCategory, val);
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    router.push("/products");
  };

  const openEnquiry = (subject?: string) => {
    window.dispatchEvent(new CustomEvent("open-enquiry", { detail: { subject } }));
  };

  // Filter products dynamically
  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesCategory = activeCategory === "All" || prod.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex-grow flex flex-col">
      {/* Subpage Header Banner */}
      <section className="bg-[#12213F] text-white pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col gap-2.5">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <Link href="/" className="hover:text-[#7FC700] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Products</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Our Product Portfolio
            </h1>
            <p className="text-gray-400 text-sm max-w-xl">
              Showcasing certified compositions formulated to save lives and support health.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="bg-[#F4F7FB] py-12 flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. Filter Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)]">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <h3 className="font-heading text-base font-bold text-brand-navy">
                  Filters
                </h3>
                {(activeCategory !== "All" || searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <RotateCcw className="size-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Categories list */}
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                  Category
                </h4>
                <button
                  onClick={() => handleCategoryChange("All")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === "All"
                      ? "bg-primary text-white shadow-sm"
                      : "text-brand-navy/80 hover:bg-[#F4F7FB] hover:text-primary"
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-primary text-white shadow-sm"
                        : "text-brand-navy/80 hover:bg-[#F4F7FB] hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Listing Panel */}
            <div className="lg:col-span-9 flex flex-col gap-6 w-full">
              
              {/* Search and Top Info bar */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] justify-between">
                
                {/* Search Input */}
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name, composition, or use..."
                    className="w-full bg-[#F4F7FB] border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>

                <div className="text-[11px] font-bold text-brand-navy tracking-wide">
                  Showing {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""}
                </div>

              </div>

              {/* Category Chips (Mobile Layout only) */}
              <div className="block lg:hidden w-full overflow-x-auto pb-2 -mb-2 scrollbar-none">
                <div className="flex gap-2 min-w-max">
                  <button
                    onClick={() => handleCategoryChange("All")}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      activeCategory === "All"
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-brand-navy/80 border-gray-100 hover:bg-[#F4F7FB]"
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        activeCategory === cat
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white text-brand-navy/80 border-gray-100 hover:bg-[#F4F7FB]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zero products state */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-[32px] p-12 text-center border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] flex flex-col items-center gap-4">
                  <div className="size-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                    <Search className="size-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-brand-navy">
                    No Products Found
                  </h3>
                  <p className="text-gray-400 text-xs max-w-sm leading-relaxed">
                    We couldn't find any products matching your active filters. Try searching for other keywords or reset the category filters.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-md mt-2 cursor-pointer"
                  >
                    <RotateCcw className="size-4" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                /* Products Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="group/card bg-white rounded-3xl overflow-hidden border border-gray-100/60 shadow-[0_10px_30px_rgba(18,33,63,0.02)] hover:shadow-[0_15px_35px_rgba(18,33,63,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      
                      {/* Image Placeholder */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 p-6 flex items-center justify-center border-b border-gray-50 relative group-hover/card:scale-[1.01] transition-transform duration-500">
                        <Award className="size-10 text-primary/20" />
                        <span className="absolute top-4 left-4 rounded-full bg-[#EAF4DA] px-2.5 py-0.5 text-[9px] font-bold text-brand-navy uppercase tracking-wider">
                          {prod.category}
                        </span>
                      </div>

                      <div className="p-6 flex flex-col flex-grow text-left">
                        <h3 className="font-heading text-base font-bold text-brand-navy group-hover/card:text-primary transition-colors mb-1 leading-snug">
                          {prod.name}
                        </h3>
                        <p className="text-[10px] text-gray-400 italic mb-4 line-clamp-1">
                          Composition: {prod.composition}
                        </p>
                        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-6">
                          {prod.description}
                        </p>

                        <div className="flex flex-col gap-2 mt-auto">
                          <Link
                            href={`/products/${prod.id}`}
                            className="w-full text-center border border-gray-100 hover:border-primary/20 hover:bg-primary/5 text-brand-navy font-bold py-2.5 rounded-xl text-xs transition-colors"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => openEnquiry(prod.name)}
                            className="w-full text-center bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                          >
                            Enquire Now
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="w-full flex-grow flex flex-col pt-28 md:pt-36">
      {/* Skeleton Banner */}
      <div className="bg-[#12213F] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12 bg-white/10" />
            <span className="text-white/20 text-xs">/</span>
            <Skeleton className="h-4.5 w-16 bg-white/10" />
          </div>
          <Skeleton className="h-10 w-64 bg-white/20 rounded-xl" />
          <Skeleton className="h-5 w-96 bg-white/10 rounded-lg" />
        </div>
      </div>

      {/* Skeleton Catalog Grid */}
      <div className="bg-[#F4F7FB] py-12 flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Skeleton */}
            <div className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] flex flex-col gap-6 text-left">
              <Skeleton className="h-6 w-20" />
              <div className="border-t border-gray-50 pt-6 flex flex-col gap-2.5">
                <Skeleton className="h-3 w-16 mb-2.5" />
                <Skeleton className="h-10 w-full rounded-xl" />
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-xl" />
                ))}
              </div>
            </div>

            {/* Grid Skeleton */}
            <div className="lg:col-span-9 flex flex-col gap-6 w-full">
              {/* Search Bar Skeleton */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] justify-between">
                <Skeleton className="h-10 w-full sm:max-w-md rounded-2xl" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-100/60 shadow-[0_10px_30px_rgba(18,33,63,0.02)] p-5 flex flex-col gap-4 text-left">
                    {/* Image Skeleton */}
                    <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                    {/* Title & Info */}
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    {/* Desc */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      <Skeleton className="h-3.5 w-full" />
                      <Skeleton className="h-3.5 w-5/6" />
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-50">
                      <Skeleton className="h-9 w-full rounded-xl" />
                      <Skeleton className="h-9 w-full rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsCatalog />
    </Suspense>
  );
}

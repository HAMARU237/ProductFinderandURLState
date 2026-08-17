import Link from "next/link"
import { products } from "@/data/products"
import { filterProducts } from "@/lib/filter-products"

const PAGE_SIZE = 4

type PageProps = {
  searchParams: Promise<{
    q?: string
    category?: string
    sort?: string
    page?: string
    minPrice?: string
    maxPrice?: string
  }>
}

export default async function ProductsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams

  // =========================
  // Query
  // =========================

  const query = params.q ?? ""

  // =========================
  // Category
  // =========================

  const category =
    params.category === "office" ||
    params.category === "tech" ||
    params.category === "lifestyle"
      ? params.category
      : "all"

  // =========================
  // Sort
  // =========================

  const sort =
    params.sort === "price-asc" ||
    params.sort === "price-desc"
      ? params.sort
      : "name"

  // =========================
  // Price
  // =========================

  const parsedMinPrice = Number(params.minPrice)
  const parsedMaxPrice = Number(params.maxPrice)

  const minPrice =
    params.minPrice !== undefined &&
    params.minPrice !== "" &&
    Number.isFinite(parsedMinPrice) &&
    parsedMinPrice >= 0
      ? parsedMinPrice
      : undefined

  const maxPrice =
    params.maxPrice !== undefined &&
    params.maxPrice !== "" &&
    Number.isFinite(parsedMaxPrice) &&
    parsedMaxPrice >= 0
      ? parsedMaxPrice
      : undefined

  // =========================
  // Page
  // =========================

  const requestedPage = Number(params.page ?? "1")

  // =========================
  // Filter
  // =========================

  const filtered = filterProducts(products, {
    query,
    category,
    sort,
    minPrice,
    maxPrice,
  })

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE),
  )

  const currentPage = Number.isInteger(requestedPage)
    ? Math.min(
        Math.max(requestedPage, 1),
        totalPages,
      )
    : 1

  const start = (currentPage - 1) * PAGE_SIZE

  const visibleProducts = filtered.slice(
    start,
    start + PAGE_SIZE,
  )

  // =========================
  // Create URL
  // =========================

  function pageHref(page: number) {
    const nextParams = new URLSearchParams()

    if (query) {
      nextParams.set("q", query)
    }

    if (category !== "all") {
      nextParams.set("category", category)
    }

    if (sort !== "name") {
      nextParams.set("sort", sort)
    }

    if (minPrice !== undefined) {
      nextParams.set("minPrice", String(minPrice))
    }

    if (maxPrice !== undefined) {
      nextParams.set("maxPrice", String(maxPrice))
    }

    nextParams.set("page", String(page))

    return `/products?${nextParams.toString()}`
  }

  return (
    <main className="min-h-screen bg-[#160b08] px-5 py-12 text-[#f1e3c6]">

      <div className="mx-auto max-w-6xl">

        {/* =========================
            Header
        ========================= */}

        <div className="border-b border-[#5c241c] pb-6">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#c92828]">
            Western Collection
          </p>

          <h1 className="mt-2 text-4xl font-black uppercase tracking-wide text-[#d52b2b] md:text-5xl">
            Product Finder
          </h1>

          <p className="mt-3 text-[#b9a58a]">
            ค้นหา กรอง เรียง และแบ่งหน้าสินค้า
          </p>
        </div>

        {/* =========================
            Filter Form
        ========================= */}

        <form
          action="/products"
          method="get"
          className="mt-8 grid gap-5 rounded-2xl border border-[#5c241c] bg-[#241411] p-6 shadow-2xl md:grid-cols-4"
        >

          {/* Search */}

          <label className="md:col-span-2">
            <span className="mb-2 block text-sm font-bold text-[#d8c3a5]">
              คำค้นหา
            </span>

            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="เช่น Desk"
              className="w-full rounded-lg border border-[#6b3328] bg-[#120b09] px-3 py-2 text-[#f1e3c6] outline-none placeholder:text-[#806b58] focus:border-[#c92828] focus:ring-1 focus:ring-[#c92828]"
            />
          </label>

          {/* Category */}

          <label>
            <span className="mb-2 block text-sm font-bold text-[#d8c3a5]">
              หมวดหมู่
            </span>

            <select
              name="category"
              defaultValue={category}
              className="w-full rounded-lg border border-[#6b3328] bg-[#120b09] px-3 py-2 text-[#f1e3c6] outline-none focus:border-[#c92828]"
            >
              <option value="all">
                ทั้งหมด
              </option>

              <option value="office">
                Office
              </option>

              <option value="tech">
                Tech
              </option>

              <option value="lifestyle">
                Lifestyle
              </option>
            </select>
          </label>

          {/* Sort */}

          <label>
            <span className="mb-2 block text-sm font-bold text-[#d8c3a5]">
              เรียงตาม
            </span>

            <select
              name="sort"
              defaultValue={sort}
              className="w-full rounded-lg border border-[#6b3328] bg-[#120b09] px-3 py-2 text-[#f1e3c6] outline-none focus:border-[#c92828]"
            >
              <option value="name">
                ชื่อ
              </option>

              <option value="price-asc">
                ราคาน้อยไปมาก
              </option>

              <option value="price-desc">
                ราคามากไปน้อย
              </option>
            </select>
          </label>

          {/* Min Price */}

          <label>
            <span className="mb-2 block text-sm font-bold text-[#d8c3a5]">
              ราคาต่ำสุด
            </span>

            <input
              type="number"
              name="minPrice"
              min="0"
              defaultValue={minPrice}
              placeholder="เช่น 500"
              className="w-full rounded-lg border border-[#6b3328] bg-[#120b09] px-3 py-2 text-[#f1e3c6] outline-none placeholder:text-[#806b58] focus:border-[#c92828] focus:ring-1 focus:ring-[#c92828]"
            />
          </label>

          {/* Max Price */}

          <label>
            <span className="mb-2 block text-sm font-bold text-[#d8c3a5]">
              ราคาสูงสุด
            </span>

            <input
              type="number"
              name="maxPrice"
              min="0"
              defaultValue={maxPrice}
              placeholder="เช่น 5000"
              className="w-full rounded-lg border border-[#6b3328] bg-[#120b09] px-3 py-2 text-[#f1e3c6] outline-none placeholder:text-[#806b58] focus:border-[#c92828] focus:ring-1 focus:ring-[#c92828]"
            />
          </label>

          {/* Buttons */}

          <div className="flex gap-3 md:col-span-4">
            <button
              type="submit"
              className="rounded-lg bg-[#9f1d20] px-6 py-2 font-bold text-[#fff1dc] shadow-lg transition hover:bg-[#c92828] hover:shadow-[#9f1d20]/30"
            >
              ค้นหา
            </button>

            <Link
              href="/products"
              className="rounded-lg border border-[#6b3328] bg-[#1a0f0c] px-6 py-2 text-[#d8c3a5] transition hover:border-[#9f1d20] hover:bg-[#35201a]"
            >
              ล้างตัวกรอง
            </Link>
          </div>

        </form>

        {/* =========================
            Result
        ========================= */}

        <div className="my-6 flex items-center justify-between">
          <p
            role="status"
            className="text-sm text-[#b9a58a]"
          >
            พบ{" "}
            <span className="font-bold text-[#e0b15a]">
              {filtered.length}
            </span>{" "}
            รายการ · หน้า{" "}
            <span className="font-bold text-[#e0b15a]">
              {currentPage}
            </span>{" "}
            จาก {totalPages}
          </p>
        </div>

        {/* =========================
            Product List
        ========================= */}

        {visibleProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#6b3328] bg-[#241411] p-12 text-center shadow-xl">
            <h2 className="text-xl font-bold text-[#d52b2b]">
              ไม่พบสินค้า
            </h2>

            <p className="mt-2 text-[#a88f76]">
              ลองเปลี่ยนคำค้นหาหรือช่วงราคา
            </p>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <li
                key={product.id}
                className="group rounded-xl border border-[#5c241c] bg-[#241411] p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#9f1d20] hover:bg-[#2c1713]"
              >

                <p className="text-sm font-bold uppercase tracking-widest text-[#c92828]">
                  {product.category}
                </p>

                <h2 className="mt-3 text-lg font-bold text-[#f1e3c6] group-hover:text-white">
                  {product.name}
                </h2>

                <div className="mt-5 border-t border-[#4b251d] pt-4">
                  <p className="text-2xl font-black text-[#e0b15a]">
                    {product.price.toLocaleString("th-TH")} บาท
                  </p>
                </div>

              </li>
            ))}
          </ul>
        )}

        {/* =========================
            Pagination
        ========================= */}

        <nav
          aria-label="Pagination"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >

          {/* Previous */}

          {currentPage === 1 ? (
            <span className="cursor-not-allowed rounded-lg border border-[#3b2520] bg-[#17100d] px-4 py-2 text-[#5f5045]">
              Previous
            </span>
          ) : (
            <Link
              href={pageHref(currentPage - 1)}
              className="rounded-lg border border-[#6b3328] bg-[#241411] px-4 py-2 text-[#d8c3a5] transition hover:border-[#c92828] hover:bg-[#3a1b16]"
            >
              Previous
            </Link>
          )}

          {/* Page Numbers */}

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1,
          ).map((page) => (
            <Link
              key={page}
              href={pageHref(page)}
              aria-current={
                page === currentPage
                  ? "page"
                  : undefined
              }
              className="rounded-lg border border-[#6b3328] bg-[#241411] px-4 py-2 text-[#d8c3a5] transition hover:border-[#c92828] hover:bg-[#3a1b16] aria-[current=page]:border-[#c92828] aria-[current=page]:bg-[#9f1d20] aria-[current=page]:text-white"
            >
              {page}
            </Link>
          ))}

          {/* Next */}

          {currentPage === totalPages ? (
            <span className="cursor-not-allowed rounded-lg border border-[#3b2520] bg-[#17100d] px-4 py-2 text-[#5f5045]">
              Next
            </span>
          ) : (
            <Link
              href={pageHref(currentPage + 1)}
              className="rounded-lg border border-[#6b3328] bg-[#241411] px-4 py-2 text-[#d8c3a5] transition hover:border-[#c92828] hover:bg-[#3a1b16]"
            >
              Next
            </Link>
          )}

        </nav>

        {/* =========================
            Footer Decoration
        ========================= */}

        <div className="mt-12 border-t border-[#5c241c] pt-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#6f5143]">
            Product Finder • Western Collection
          </p>
        </div>

      </div>
    </main>
  )
}
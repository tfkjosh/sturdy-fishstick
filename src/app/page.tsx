import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Container } from "react-bootstrap";

export const metadata = {
    description:
      "High-performance e-commerce store built with Next.js, Vercel, and Shopify.",
    openGraph: {
      type: "website",
    },
  };
  

export default function Home() {
    return (
        <main>
            <section className="w-full pt-12 md:pt-24 lg:pt-32 border-bottom-b">
                <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                    <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                    <div>
                        <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                            Discover the Latest Fashion Trends
                        </h1>
                    </div>
                    <div className="flex flex-col items-start space-y-4">
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            Explore our curated collections of stylish apparel and
                            accessories for every occasion.
                        </p>
                        <div className="flex flex-col w-full md:flex-row gap-2 text-nowrap">
                            <Link
                            href="/search/womens"
                            className="inline-flex h-9 items-center justify-center rounded-md border border-transparent-200 border-input bg-background px-10 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            prefetch={false}
                            >
                            Shop Women
                            </Link>
                            <Link
                            href="/search/mens"
                            className="inline-flex h-9 items-center justify-center rounded-md border border-transparent-200 border-input bg-background px-10 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            prefetch={false}
                            >
                            Shop Men
                            </Link>
                            <Link
                            href="/search/sales"
                            className="inline-flex h-9 items-center justify-center rounded-md border border-transparent-200 border-input bg-background px-10 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            prefetch={false}
                            >
                            Shop Sales
                            </Link>
                        </div>
                    </div>
                </div>
                <Image
                src="/banner.jpg"
                width="1270"
                height="300"
                alt="Hero"
                className="mx-auto rounded-t-xl object-cover"
                />
                </div>
            </section>
      <section className="w-full py-12 md:py-24 lg:py-32 grid place-content-center">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                New Arrivals
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Trending Now
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out our latest collection of stylish and comfortable
                clothing.
              </p> 
             </div>
          </div>
          <div className="mx-auto grid items-start justify-center gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
            <div className="grid gap-1">
              <Link
                href="https://blogxspace.netlify.app"
                className="group"
                prefetch={true}
              >
                <Image
                  src="/aow.jpeg"
                  width="400"
                  height="500"
                  alt="Rhetoric"
                  className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="mt-4 text-lg font-bold group-hover:underline">
                  
                </h3>
              </Link>
            </div>
            <div className="grid gap-1">
              <Link
                href="https://blogxspace.netlify.app"
                className="group"
                prefetch={false}
              >
                <img
                  src="/com.jpg"
                  width="400"
                  height="500"
                  alt="Rhetoric"
                  className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="mt-4 text-lg font-bold group-hover:underline">
                  
                </h3>
              </Link>
            </div>
            {/* <div className="grid gap-1">
              <Link 
                href="https://blogxspace.netlify.app" 
                className="group" 
                prefetch={false}>
                <img
                  src="/tres.jpg"
                  width="400"
                  height="500"
                  alt="Kids' Collection"
                  className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="mt-4 text-lg font-bold group-hover:underline">
                
                </h3>
              </Link>
            </div> */}
            {/* <div className="grid gap-1">
              <Link 
                href="https://blogxspace.netlify.app" 
                className="group" 
                prefetch={false}>
                <img
                  src="/sknk.jpg"
                  width="400"
                  height="500"
                  alt="SKNKWEAR"
                  className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="mt-4 text-lg font-bold group-hover:underline">
                </h3>
              </Link>
            </div> */}
          </div>
        </div>
      </section>
      {/* <section className="w-full py-12 lg:py-7 bg-[url('/sale-backdrop.svg')] grid place-content-center"> */}
        {/* <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6"> */}
          {/* <Container>
            <div className="ratio ratio-1x1">
              <iframe className="" src="https://www.youtube.com/embed/TOb9wu3rBsk" title="YouTube video" allowFullScreen></iframe>
            </div>
          </Container> */}
          {/* <div className="space-y-3 z-50">
            <div className="bg-white dark:bg-black"> */}
              {/* <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight p-2">
                Explore Top Picks For You
              </h2> */}
            {/* </div>
            <div className="bg-white">
              <p className="mx-auto max-w-[600px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed p-2">
                Stay tuned into new music, podcasts and vlog posts  
                .
              </p>
            </div>
          </div>
        </div> */}
      {/* </section> */}
        </main>
    )
}
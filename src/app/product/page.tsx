import { Suspense } from "react";
import Gallery from "../components/product/gallery";
import { getProduct } from "../lib/shopify";
import { Image } from "../lib/shopify/types";

export default async function ProductPage({
    params,
}: {
    params: {handle: string};
}) {
    const product = await getProduct(params.handle);
    return (
        <div className="mx-auto max-w-screen-2xl px-4">
            <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
                <div className="h-full w-full basis-full lg:basis-4/6">
                    <Suspense 
                        fallback={
                            <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
                        }
                    >
                        <Gallery 
                            images={product.images.slice(0, 5).map((image: Image) => ({
                            src: image.url,
                            altText: image.altText,
                            }))} 
                        />
                    </Suspense>
                </div>
                <div className="basis-full lg:basis-2/6">
                    <ProductDescription />
                </div>
            </div>
            <RelatedProducts />
        </div>
    );
}
import { z } from "zod";
import { defaultSort, sorting } from "../lib/constants";

export async function SearchPage({
    searchParams,
}: {
    searchParams?: {[key: string]: string | string[] | undefined};
}) {
    const {sort, q: searchValue} = searchParams as {[key: string]: string};
    const {sortKey, reverse} = 
        sorting.find((item) => item.slug === sort) || defaultSort;
    const products = await getProducts({sortKey, reverse, query: searchValue});
    const resultsText = products.length > 1 ? "results" : "result"

    return (
        <>
            {searchValue ? (
                <p className="mb-4">
                    {products.length === 0 
                        ? "There are no products that match"
                        : `Showing ${products.length} ${resultsText} for`}
                        <span>&quot;{searchValue}&quot;</span>
                </p>
            ) : null}
            {products.length > 0 ? (
                <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <ProductGridItems products={products} />
                </Grid>
            ):null}
        </>
    );
}   

export default SearchPage;
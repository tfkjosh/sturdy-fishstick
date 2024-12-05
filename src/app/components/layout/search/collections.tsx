import { getCollections } from "@/app/lib/shopify";
import FilterList from "./filter";

async function CollectionList() {
    const Collections = await getCollections();

    return <FilterList list={collections} title="Collections" />
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default function Collections() {
    return <CollectionList />
}
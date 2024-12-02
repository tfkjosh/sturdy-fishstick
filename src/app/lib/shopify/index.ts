import { headers } from "next/headers";
import { Menu, Product, ShopifyMenuOperation, ShopifyProductsOperation } from "./types";
import { getMenuQuery } from "./queries/menu";
import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constants";
import { ensureStartWith } from "../utils";
import { isShopifyError } from "../type-guards";

const domain = process.env.SHOPIFY_STORE_DOMAIN
    ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://") 
    : "";

const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`

const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ExtractVariables<T> = T extends {variables: object} 
    ? T["variables"]
    : never;

export async function shopifyFetch<T>({
    cache = 'force-cache',
    headers,
    query,
    tags,
    variables,
}: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string,
    tags?: string[],
    variables?: ExtractVariables<T>;
}): Promise<{status: number; body: T} | never > {
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": key,
                ...headers,
            },
            body: JSON.stringify({
                ...(query && {query}),
                ...(variables && {variables}),
            }),
            cache,
            ...(tags && {next: {tags}}),
        });

        const body = await result.json();
        if (body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        }
    } catch (error) {
        if (isShopifyError(error)) {
            throw {
                cause: error.cause?.toString() || 'unknown',
                status: error.status || 500,
                message: error.message,
                query, 
            };
        }

        throw {
            error,
            query,
        }
    }
}

export async function getMenu(handle: string): Promise<Menu[]> {
    const res = await shopifyFetch<ShopifyMenuOperation>({
        query: getMenuQuery,
        tags: [TAGS.collections],
        variables: {
            handle,
        },
    });

    return (
        res.body?.data?.menu?.items.map(
        (item: {title: string, url: string}) => ({
            title: item.title, 
            path: item.url
            .replace(domain, "")
            .replace("/collections", "/search")
            .replace("/pages", ""),
        })) || []
    );
}

export async function getProducts({
    query, 
    reverse, 
    sortKey
}: {
    query?: string; 
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductsOperation> ({
        query: getProductQuery,
        tags: [TAGS.products],
        variables: {
            query,
            reverse,
            sortKey,
        }
    });
}
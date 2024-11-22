import { getMenu } from "@/app/lib/shopify";

export async function Navbar() {
    const menu = await getMenu("nextjs-frontend-menu");
    console.log(menu);
    return ;
}
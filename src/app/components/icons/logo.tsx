import Image from "next/image"
import React from "react";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
    return ( 
        <Image 
            src={"/logo.png"} 
            alt={`${process.env.SITE_NAME}`} 
            width={50} 
            height={50} 
        />
    );
}
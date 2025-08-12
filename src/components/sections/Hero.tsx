import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
      <section className="w-full py-12 md:py-24 lg:py-32 grid place-content-center relative bg-videoBg h-[600px]">
      <div className='bg-black/50 absolute inset-0' />
        <div className="container space-y-12 px-4 md:px-6 relative z-10 top-48">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 text-white">
              <div className="inline-block rounded-lg bg-muted px-3 text-xl">
                ®
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Defining the Culture
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Where fashion, sound, and spoken word collide — explore streetwear, soundscapes, and stories that challenge the narrative
              </p>
            </div>
          </div>
         <div className="mx-auto max-w-4xl">
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 z-50">
            <Link
              href="https://soundcloud.com/saintsebastian1995"
              className="inline-flex h-10 items-center justify-center rounded-md bg-transparent-200 dark:bg-black px-10 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
              >
                ၊||၊|။||||။၊|။
              </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

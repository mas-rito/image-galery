"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { ArrowUpRight, CircleUserRound, Loader, X } from "lucide-react"

import { useDownloadImage } from "@/hooks/useDownloadImage"
import { useGetSigleImage } from "@/hooks/useGetImages"

import { Skeleton } from "../atoms/skeleton"

export const ModalDetailGalery = () => {
  const searchParams = useSearchParams()
  const imageId = searchParams.get("image")

  const { image, isLoading: imageIsLoading } = useGetSigleImage({
    imageId: imageId as string,
  })

  const { download, isLoading } = useDownloadImage({
    url: image?.src?.original,
    filename: image?.alt || "image",
  })

  return (
    <div
      className={`${imageId ? "visible opacity-100" : "invisible opacity-0"} fixed inset-0 z-40 transition-all`}
    >
      <section className="h-svh w-full overflow-y-auto bg-black/70 py-8 backdrop-blur">
        <div className="relative mx-auto grid w-10/12 grid-cols-6 gap-2">
          <div className="absolute -right-3.5 -top-3.5">
            <Link
              href="/"
              className="block rounded-full border border-zinc-700 bg-white p-2 text-zinc-900"
              title="Kembali"
            >
              <X />
            </Link>
          </div>
          <div className="col-span-4 h-[90vh] rounded-xl bg-white p-2 shadow">
            {imageIsLoading ? (
              <Skeleton className="h-full w-full rounded-lg" />
            ) : (
              <Image
                width={700}
                height={700}
                loading="lazy"
                className="h-full w-full rounded-lg object-contain"
                src={image?.src?.original}
                alt={image?.alt || "image"}
              />
            )}
          </div>
          <div className="col-span-2 h-fit space-y-2 rounded-xl bg-white px-4 pb-6 pt-4 shadow">
            <h2 className="text-lg text-zinc-600">Tentang foto</h2>
            <div className="space-y-10">
              <div className="space-y-6">
                {imageIsLoading ? (
                  <Skeleton className="h-8 w-full rounded-lg" />
                ) : (
                  <h1 className="text-2xl font-medium">
                    {image?.alt || "image"}
                  </h1>
                )}
                <div className="space-y-2">
                  <p className="text-sm text-zinc-500">Fotografer</p>
                  {imageIsLoading ? (
                    <Skeleton className="h-12 w-full rounded-full" />
                  ) : (
                    <div className="flex items-center justify-between gap-x-4 rounded-full bg-zinc-50 p-1">
                      <div className="flex items-center gap-x-2 rounded-full bg-zinc-200 py-2 pe-3.5 ps-2.5 text-zinc-700 transition-opacity hover:opacity-90">
                        <CircleUserRound />
                        <h3 className="truncate">{image?.photographer}</h3>
                      </div>
                      <Link
                        href={image?.photographer_url || "#"}
                        target="_blank"
                        className="rounded-full bg-zinc-200 p-2 text-zinc-700 transition-opacity hover:opacity-90"
                        title="Lihat profil"
                      >
                        <ArrowUpRight />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={download}
                disabled={isLoading || imageIsLoading}
                title="Download foto"
                className="w-full rounded-full bg-red-600 py-3 text-center text-white transition-opacity hover:opacity-90 disabled:opacity-90"
              >
                {isLoading ? (
                  <Loader className="animate-spin-slow mx-auto h-5 w-5 md:h-6 md:w-6" />
                ) : (
                  "Download"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
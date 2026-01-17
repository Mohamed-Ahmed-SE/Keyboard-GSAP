import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => null);

  if (!page) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-center text-white p-6">
        <h1 className="text-4xl font-bold">Nimbus Keyboards</h1>
        <p className="max-w-md text-lg text-slate-400">
          The "homepage" document was not found in Prismic. Please create a document of type "homepage" and publish it.
        </p>
        <div className="mt-4 rounded bg-slate-800 p-4 font-mono text-sm text-yellow-400">
          Expected Type: homepage
        </div>
      </div>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => null);

  if (!page) {
    return {
      title: "Nimbus Keyboards - Setup Required",
      description: "Please publish your homepage content in Prismic.",
    };
  }

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function SwitchesPage() {
    const client = createClient();
    const page = await client.getSingle("switches").catch(() => null);

    if (!page) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white gap-4 text-center p-6 bg-slate-950">
                <h1 className="text-4xl font-bold">Switches Page</h1>
                <p className="text-lg text-slate-400 max-w-md">
                    The "switches" document was not found in Prismic. Please create a document of type "switches" and publish it.
                </p>
                <div className="bg-slate-900 text-yellow-400 font-mono text-sm p-4 rounded mt-4 border border-slate-800">
                    Expected Type: switches
                </div>
            </div>
        );
    }

    return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata() {
    const client = createClient();
    const page = await client.getSingle("switches").catch(() => null);

    return {
        title: page?.data.meta_title ?? "Switches | Nimbus",
        description: page?.data.meta_description,
    };
}

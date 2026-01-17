"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import clsx from "clsx";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/**
 * Props for `ComparisonTable`.
 */
export type ComparisonTableProps =
    SliceComponentProps<Content.ComparisonTableSlice>;

/**
 * Component for "ComparisonTable" Slices.
 */
const ComparisonTable = ({ slice }: ComparisonTableProps) => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".comparison-row",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 80%",
                    },
                },
            );
        },
        { scope: container },
    );

    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="px-6 py-24 md:px-12"
            ref={container}
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <PrismicRichText
                        field={slice.primary.heading}
                        components={{
                            heading2: ({ children }) => (
                                <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                                    {children}
                                </h2>
                            ),
                        }}
                    />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
                    <table className="w-full min-w-[800px] text-left text-slate-300">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-6 font-medium text-white">Model</th>
                                <th className="p-6 font-medium text-white">Switch Type</th>
                                <th className="p-6 font-medium text-white">Wireless</th>
                                <th className="p-6 font-medium text-white">Hot Swappable</th>
                                <th className="p-6 font-medium text-white">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slice.primary.items.map((item, index) => (
                                <tr
                                    key={index}
                                    className="comparison-row border-b border-white/5 transition-colors hover:bg-white/5"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-16 relative overflow-hidden rounded bg-slate-800">
                                                <PrismicNextImage field={item.image} className="object-cover w-full h-full" />
                                            </div>
                                            <span className="font-bold text-white">
                                                {item.model_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6">{item.switch_type}</td>
                                    <td className="p-6">
                                        <span
                                            className={clsx(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                item.wireless
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-slate-700 text-slate-400",
                                            )}
                                        >
                                            {item.wireless ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span
                                            className={clsx(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                item.hot_swappable
                                                    ? "bg-blue-500/10 text-blue-400"
                                                    : "bg-slate-700 text-slate-400",
                                            )}
                                        >
                                            {item.hot_swappable ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="p-6 font-mono text-lg text-white">
                                        {item.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;

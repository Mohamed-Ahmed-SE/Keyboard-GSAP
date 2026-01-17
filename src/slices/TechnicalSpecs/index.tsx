"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export type TechnicalSpecsProps =
    SliceComponentProps<Content.TechnicalSpecsSlice>;

const TechnicalSpecs = ({ slice }: TechnicalSpecsProps) => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".spec-item",
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 85%",
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
            className="py-24 px-6 md:px-12"
            ref={container}
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 grid gap-8 md:grid-cols-2">
                    <div>
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
                    <div className="text-lg text-slate-400">
                        <PrismicRichText field={slice.primary.description} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 lg:grid-cols-6 rounded-2xl overflow-hidden border border-white/10">
                    {slice.primary.specs.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="spec-item bg-slate-900/40 p-6 hover:bg-white/5 transition-colors backdrop-blur-md"
                        >
                            <div className="mb-2 text-sm font-medium text-slate-500 uppercase tracking-wider">
                                {item.label}
                            </div>
                            <div className="text-xl font-bold text-white font-mono break-words">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnicalSpecs;

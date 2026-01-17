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

export type ContentImageSplitProps =
    SliceComponentProps<Content.ContentImageSplitSlice>;

const ContentImageSplit = ({ slice }: ContentImageSplitProps) => {
    const container = useRef<HTMLElement>(null);
    const imagePosition = slice.primary.image_position || "Left";

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                    end: "bottom 80%",
                },
            });

            tl.fromTo(
                ".split-image",
                { opacity: 0, x: imagePosition === "Left" ? -50 : 50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
            ).fromTo(
                ".split-content",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.5",
            );
        },
        { scope: container },
    );

    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="py-24 px-6 md:px-12 overflow-hidden"
            ref={container}
        >
            <div className="mx-auto max-w-7xl">
                <div
                    className={clsx(
                        "grid gap-12 lg:grid-cols-2 lg:items-center",
                        imagePosition === "Right" && "lg:grid-flow-dense",
                    )}
                >
                    <div
                        className={clsx(
                            "split-image relative aspect-square w-full sm:aspect-video lg:aspect-square overflow-hidden rounded-2xl bg-slate-800",
                            imagePosition === "Right" && "lg:col-start-2",
                        )}
                    >
                        <PrismicNextImage
                            field={slice.primary.image}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div
                        className={clsx(
                            "split-content",
                            imagePosition === "Right" && "lg:col-start-1",
                        )}
                    >
                        <div className="mb-6">
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
                        <div className="prose prose-invert prose-lg text-slate-300">
                            <PrismicRichText field={slice.primary.body} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentImageSplit;

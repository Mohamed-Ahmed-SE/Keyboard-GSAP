"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export type ClosingTransitionProps =
    SliceComponentProps<Content.ClosingTransitionSlice>;

const ClosingTransition = ({ slice }: ClosingTransitionProps) => {
    const container = useRef<HTMLDivElement>(null);
    const circle = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: 1,
                },
            });

            tl.fromTo(
                circle.current,
                { scale: 0, opacity: 0 },
                { scale: 3, opacity: 0.2, ease: "power2.inOut" },
            );

            gsap.fromTo(
                ".closing-content",
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: container.current,
                        start: "center 80%",
                        end: "center 50%",
                        scrub: 1,
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
            className="relative flex h-screen items-center justify-center overflow-hidden bg-slate-950"
            ref={container}
        >
            <div
                ref={circle}
                className="absolute h-[50vw] w-[50vw] rounded-full bg-blue-500 blur-[100px]"
            />

            <div className="closing-content relative z-10 text-center">
                <div className="mb-8">
                    <PrismicRichText
                        field={slice.primary.heading}
                        components={{
                            heading2: ({ children }) => (
                                <h2 className="text-6xl font-black text-white md:text-8xl tracking-tight">
                                    {children}
                                </h2>
                            ),
                        }}
                    />
                </div>
                <PrismicNextLink
                    field={slice.primary.cta_link}
                    className="inline-block rounded-full bg-white px-8 py-4 text-xl font-bold text-slate-900 transition-transform hover:scale-105"
                >
                    {slice.primary.cta_text || "Get Started"}
                </PrismicNextLink>
            </div>
        </section>
    );
};

export default ClosingTransition;

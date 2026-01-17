"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const Testimonials = ({ slice }: TestimonialsProps) => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".testimonial-card",
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 75%",
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
            className="py-24 px-6 md:px-12 bg-slate-900/30"
            ref={container}
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 text-center">
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

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {slice.primary.items.map((item, index) => (
                        <div
                            key={index}
                            className="testimonial-card flex flex-col justify-between rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className="mb-6">
                                <PrismicRichText
                                    field={item.quote}
                                    components={{
                                        paragraph: ({ children }) => (
                                            <p className="text-lg italic text-slate-300 leading-relaxed">
                                                &quot;{children}&quot;
                                            </p>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-700">
                                    <PrismicNextImage field={item.avatar} className="object-cover h-full w-full" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.author}</div>
                                    <div className="text-sm text-slate-400">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import clsx from "clsx";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export type TextRevealProps = SliceComponentProps<Content.TextRevealSlice>;

const TextReveal = ({ slice }: TextRevealProps) => {
    const container = useRef<HTMLDivElement>(null);
    const style = slice.primary.style || "Stagger";

    useGSAP(
        () => {
            if (!container.current) return;

            const textElement = container.current.querySelector(".reveal-text");
            if (!textElement) return;

            const split = new SplitText(textElement, { type: "chars" });
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
            });

            if (style === "Fade") {
                tl.from(split.chars, {
                    opacity: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: "power2.out",
                });
            } else if (style === "Rotate") {
                tl.from(split.chars, {
                    opacity: 0,
                    rotateX: -90,
                    y: 50,
                    duration: 0.8,
                    stagger: 0.03,
                    ease: "back.out(1.7)",
                });
            } else {
                // Stagger (Default)
                tl.from(split.chars, {
                    opacity: 0,
                    y: 80,
                    duration: 1,
                    stagger: 0.02,
                    ease: "power3.out",
                });
            }
        },
        { scope: container },
    );

    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="py-32 px-6 overflow-hidden"
            ref={container}
        >
            <div className="mx-auto max-w-7xl text-center">
                <div className="reveal-text">
                    <PrismicRichText
                        field={slice.primary.text}
                        components={{
                            heading2: ({ children }) => (
                                <h2 className="text-6xl font-black uppercase text-white sm:text-7xl lg:text-9xl tracking-tighter leading-none">
                                    {children}
                                </h2>
                            ),
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default TextReveal;

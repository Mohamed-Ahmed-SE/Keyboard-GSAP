"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { Canvas } from "@react-three/fiber";
import { Stars, Cloud } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import clsx from "clsx";

/**
 * Props for `AmbientBackground`.
 */
export type AmbientBackgroundProps =
    SliceComponentProps<Content.AmbientBackgroundSlice>;

function BackgroundVisual({ style }: { style: "Stars" | "Grid" | "Noise" }) {
    if (style === "Stars") {
        return (
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </Canvas>
            </div>
        );
    }
    if (style === "Grid") {
        return (
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        );
    }
    if (style === "Noise") {
        return (
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        )
    }
    return null;
}

/**
 * Component for "AmbientBackground" Slices.
 */
const AmbientBackground = ({ slice }: AmbientBackgroundProps) => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".ambient-heading",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 60%"
                    }
                },
            );
        },
        { scope: container },
    );

    const style = slice.primary.style || "Stars";

    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="relative min-h-[60vh] w-full overflow-hidden flex items-center justify-center py-24" // Reduced height
            ref={container}
        >
            <BackgroundVisual style={style as any} />

            <div className="relative z-10 max-w-5xl px-6 text-center">
                <div className="ambient-heading">
                    <PrismicRichText
                        field={slice.primary.heading}
                        components={{
                            heading1: ({ children }) => (
                                <h2 className="text-5xl font-black text-white md:text-7xl lg:text-8xl tracking-tighter">
                                    {children}
                                </h2>
                            ),
                        }}
                    />
                </div>
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
        </section>
    );
};

export default AmbientBackground;

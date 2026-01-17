"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export default function TestPage() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!container.current) return;
            const split = new SplitText(container.current, { type: "chars" });
            gsap.from(split.chars, { opacity: 0, stagger: 0.1 });
        },
        { scope: container },
    );

    return (
        <div className="h-screen bg-black text-white flex items-center justify-center">
            <h1 ref={container} className="text-4xl">
                GSAP SplitText Test
            </h1>
        </div>
    );
}

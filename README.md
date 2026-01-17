# ⌨️ Nimbus Keyboards

> **A Next.js 15 + GSAP + Three.js Showcase**  
> Experience the future of typing with a highly interactive, 3D-accelerated keyboard configurator.

## 🌟 Project Overview

**Nimbus Keyboards** is a cutting-edge web application designed to showcase premium mechanical keyboards. Built with the latest web technologies, it features a highly immersive user experience driven by complex GSAP animations and real-time 3D rendering with React Three Fiber.

This project serves as a comprehensive reference for modern frontend architecture, demonstrating how to integrate high-performance animations, CMS-driven content, and 3D elements into a seamless narrative flow.

---

---

## 🛠 Tech Stack

### Core Frameworks
- **Next.js 15 (App Router)**: Utilizing server components and advanced routing.
- **React 19**: Leveraging the latest React features for concurrency and state management.
- **TypeScript**: Ensuring type safety across the entire application.

### Styling & Design
- **Tailwind CSS 4**: The latest evolution of the utility-first CSS framework.
- **Fonts**: `Roboto Flex` (Variable Font) for sophisticated typography.
- **Icons**: `react-icons` for a diverse icon set.

### Animation & 3D
- **GSAP 3.13** (GreenSock Animation Platform): The engine behind the site's fluid motion.
  - `ScrollTrigger`: For scroll-driven interactions.
  - `SplitText`: For advanced text reveal effects.
  - `useGSAP`: The official React hook for safe GSAP context management.
- **React Three Fiber (R3F)**: Declarative 3D scenes using Three.js.
- **Drei**: Useful helpers for R3F scenes.

### CMS
- **Prismic**: Headless CMS for managing dynamic slices and content.
- **Slice Machine**: Local development tool for building Prismic slices.

---

## 🚧 Current Status & Known Issues

### ⚠️ Prismic Content Required
The application structure is fully built and deployed locally, but **all pages currently display a "Setup Required" fallback UI**. This is expected behavior.
- **Problem**: The CMS is currently empty.
- **Solution**: You must creating Documents in Prismic for `homepage`, `keyboards`, `switches`, `technology`, and `configurator` to populate the site.

### ✅ Recent Fixes (Phase 4)
- **Resolved "Load failed" / Runtime TypeError**: Fixed a critical SSR crash where `SplitText` and `ScrollTrigger` were accessing `window` during the server-side build. All GSAP plugins are now strictly guarded with `if (typeof window !== "undefined")`.
- **Fixed SyntaxErrors**: Resolved duplicate `return` statements in page templates.

---

## 📜 Complete Changelog (Expansion Update)

We have significantly expanded the original prototype into a comprehensive 5-page application.

### New Pages
1.  `/` (Home): Completely rebuilt with new slices.
2.  `/keyboards`: Product showcase with filtering capabilities.
3.  `/switches`: Deep dive into mechanical switch technology.
4.  `/configurator`: 3D interactive keyboard builder.
5.  `/technology`: Technical specifications and craftsmanship details.

### New Slices (Components)
*   **`ComparisonTable`**: Horizontal scrollable comparison between models. Staggered row entry animations.
*   **`Testimonials`**: Animated cards reviewing the product with scroll-triggered fade-ins.
*   **`TechnicalSpecs`**: A detailed data-grid for keyboard specifications (switches, dimensions, connectivity).
*   **`AmbientBackground`**: Cinematic background layer using R3F Stars or CSS noise fallbacks.
*   **`ContentImageSplit`**: Standard marketing layout (50/50) with directional entry animations.
*   **`TextReveal`**: Kinetic typography using `SplitText` for character-by-character reveals.
*   **`ClosingTransition`**: A scaling circular reveal effect for footer transitions.

### Infrastructure Updates
*   **GSAP Safe Context**: Audited all 12 slices to ensure every animation is wrapped in `useGSAP` and scoped to `containerRef` for memory leak prevention.
*   **SSR Safety**: Implemented window checks for all GSAP plugin registrations to prevent hydration mismatches.

---

## 🎨 Design System

The visual language of Nimbus Keyboards is built on a foundation of sleek, futuristic aesthetics.

### Typography
We utilize **Roboto Flex**, a variable font that allows for fluid adjustment of weight, width, and slant. This enables dynamic typography that reacts to user interaction and scroll position.

### Color Palette
The primary theme rests on a deep, oceanic gradient:
- **Class**: `.blue-gradient-bg`
- **Definition**: `linear-gradient(to bottom, #000000, #0f172a, #062f4a, #7fa0b9)`
- **Vibe**: Sophisticated, tech-forward, and premium.

### UI Components
- **`Button.tsx`**: A reusable CTA component with hover states.
- **`FadeIn.tsx`**: A utility wrapper that orchestrates staggered entry animations for its children.
- **`Loader.tsx`**: A custom loading screen to manage asset preloading for 3D scenes.
- **`StarGrid.tsx`**: An ambient background effect.

---

## 🚀 GSAP Animation Architecture

Animations are a first-class citizen in this project, not an afterthought. We use a centralized approach to manage timelines and triggers.

### Key Animation Patterns

#### 1. Context-Safe Hooks (`useGSAP`)
All GSAP code is wrapped in the `useGSAP` hook to ensure proper cleanup and React Strict Mode compatibility.
```typescript
useGSAP(() => {
  // Animation logic safely scoped to the component
}, { scope: containerRef });
```

#### 2. Text Reveals
We employ `SplitText` to break headers into characters or words, then animate them using a staggered stagger.
**Example (Hero Slice):**
```typescript
tl.fromTo(".hero-header-word", {
  scale: 3,
  opacity: 0,
}, {
  scale: 1,
  opacity: 1,
  stagger: 0.2,
});
```

#### 3. Scroll-Driven 3D Scenes
The 3D keyboard models (in `Hero` and `ColorChanger` slices) are synchronized with the DOM scroll.
- **Mechanism**: The 3D scene canvas sits in the background, while the DOM elements trigger camera moves and material changes via `ScrollTrigger`.
- **Integration**: We use a shared state or event bus (often context or direct prop passing) to signal the 3D scene to transition states based on scroll position.

#### 4. Interactive Playground (`SwitchPlayground`)
A pure GSAP interactive module where users can "press" keys.
- **Logic**: Clicking a color triggers a `gsap.to()` tween that rotates the switch 3D model and plays a corresponding sound effect.
- **Randomization**: `gsap.utils.random()` is used to vary the sound pitch for realism.

---

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router root
│   ├── globals.css       # Global styles & Tailwind directives
│   ├── layout.tsx        # Root layout with Prismic preview
│   └── page.tsx          # Homepage rendering
├── components/           # Shared UI components
│   ├── Button.tsx        # CTA Button
│   ├── FadeIn.tsx        # Animation Wrapper
│   ├── Footer.tsx        # Site Footer
│   ├── Header.tsx        # Navigation Header
│   └── ...
├── slices/               # Prismic Content Slices (Sections)
│   ├── Hero/             # Main entrance section
│   ├── BentoBox/         # Feature grid
│   ├── ColorChanger/     # Interactive color picker
│   ├── Marquee/          # Scrolling text banner
│   ├── SwitchPlayground/ # Interactive switch demo
│   ├── ComparisonTable/  # Product specs comparison
│   ├── Testimonials/     # User reviews carousel
│   ├── TechnicalSpecs/   # Detailed data grid
│   ├── AmbientBackground/# R3F Stars/Canvas background
│   ├── ContentImageSplit/# 50/50 Layout
│   ├── TextReveal/       # Kinetic typography
│   └── ClosingTransition/# Footer transition effect
└── lib/                  # Utilities (Prismic client, etc.)
```

---

## 📦 Installation & Usage

### Prerequisites
- Node.js 18+
- npm or pnpm

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/nimbus-keyboards.git
   cd nimbus-keyboards
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the project.

4. **Run Slice Machine (CMS):**
   ```bash
   npm run slicemachine
   ```
   Open [http://localhost:9999](http://localhost:9999) to edit slices.

### Building for Production
```bash
npm run build
npm start
```

---

## 📄 License
This project is for educational and showcase purposes.

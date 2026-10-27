import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Marquee from "./components/ui/Marquee";
import { marquee } from "./data/data";

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <a
        href="#top"
        className="skip-link border-[3px] border-ink bg-sun px-4 py-2 font-mono text-sm font-bold uppercase shadow-hard"
      >
        Skip to content
      </a>

      <Navbar />
      <main>
        <Hero />
        <Marquee items={marquee.top} tone="ink" />
        <About />
        <Experience />
        <Marquee items={marquee.mid} tone="sun" reverse />
        <Projects />
        <Skills />
        <Education />
        <Marquee items={marquee.bottom} tone="hot" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

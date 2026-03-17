import Navbar from "@/components/Navbar";
import CursorEffect from "@/components/CursorEffect";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import PaidServices from "@/components/sections/PaidServices";
import OrderForm from "@/components/sections/OrderForm";
import SupportServer from "@/components/sections/SupportServer";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Global background layers */}
      <div className="fixed inset-0 bg-dark-950 -z-20" />
      <div className="fixed inset-0 bg-grid -z-10 opacity-60" />
      <div className="fixed inset-0 radial-glow-cyan -z-10" />
      <div className="fixed inset-0 radial-glow-blue -z-10" />

      {/* Floating orbs */}
      <div className="fixed top-1/4 -left-64 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] -z-10 pointer-events-none" />

      <CursorEffect />
      <Navbar />

      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <PaidServices />
      <OrderForm />
      <SupportServer />
      <Contact />
      <Footer />
    </main>
  );
}


import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import ThreeScene from "@/components/ThreeScene";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Felix Gishu | Portfolio";
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* 3D Background */}
      <ThreeScene />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <Toaster />
      </div>
    </div>
  );
};

export default Index;

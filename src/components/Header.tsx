
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-primary">PORTFOLIO</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('about')} className="text-foreground/80 hover:text-primary transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection('skills')} className="text-foreground/80 hover:text-primary transition-colors">
            Skills
          </button>
          <button onClick={() => scrollToSection('projects')} className="text-foreground/80 hover:text-primary transition-colors">
            Projects
          </button>
          <button onClick={() => scrollToSection('experience')} className="text-foreground/80 hover:text-primary transition-colors">
            Experience
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-foreground/80 hover:text-primary transition-colors">
            Contact
          </button>
        </nav>
        
        <Button onClick={() => scrollToSection('contact')} className="hidden md:flex">
          Get in Touch
        </Button>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b py-4 flex flex-col items-center gap-4">
          <button onClick={() => scrollToSection('about')} className="text-foreground/80 hover:text-primary transition-colors py-2">
            About
          </button>
          <button onClick={() => scrollToSection('skills')} className="text-foreground/80 hover:text-primary transition-colors py-2">
            Skills
          </button>
          <button onClick={() => scrollToSection('projects')} className="text-foreground/80 hover:text-primary transition-colors py-2">
            Projects
          </button>
          <button onClick={() => scrollToSection('experience')} className="text-foreground/80 hover:text-primary transition-colors py-2">
            Experience
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-foreground/80 hover:text-primary transition-colors py-2">
            Contact
          </button>
          <Button onClick={() => scrollToSection('contact')} className="mt-2 w-4/5">
            Get in Touch
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;

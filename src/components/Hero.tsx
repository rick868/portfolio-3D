
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!titleRef.current) return;
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / 25;
      const moveY = (clientY - centerY) / 25;
      
      titleRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = async () => {
    setIsDownloading(true);
    try {
      // Connect to the database to get the CV file
      const response = await fetch('https://zghdydmckwieebznjrnt.supabase.co/rest/v1/profile?select=cv_url', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnaGR5ZG1ja3dpZWViem5qcm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAyMzQyMDYsImV4cCI6MTk5NTgxMDIwNn0.L87PsWFqJ6esN8gSkeoJsMgXxVkNvmWDsqeIWQVkAQA',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnaGR5ZG1ja3dpZWViem5qcm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAyMzQyMDYsImV4cCI6MTk5NTgxMDIwNn0.L87PsWFqJ6esN8gSkeoJsMgXxVkNvmWDsqeIWQVkAQA'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CV');
      }

      const data = await response.json();
      
      if (data && data.length > 0 && data[0].cv_url) {
        // Create a temporary link to download the file
        const link = document.createElement('a');
        link.href = data[0].cv_url;
        link.setAttribute('download', 'Felix_Gishu_CV.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Download Started",
          description: "Your CV download has started",
        });
      } else {
        // If CV URL is not found in the database, show a fallback message
        toast({
          title: "CV Not Available",
          description: "The CV is currently not available. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast({
        title: "Download Failed",
        description: "There was a problem downloading the CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center text-center z-10">
        <h2 className="text-accent text-lg md:text-xl mb-4 tracking-wider">
          HI THERE, I'M
        </h2>
        
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 hero-gradient"
        >
          Felix Gishu
        </h1>
        
        <p className="text-foreground/80 text-lg md:text-xl max-w-2xl mb-8">
          I specialize in building innovative solutions with <span className="text-accent">AI</span>, 
          <span className="text-primary"> Web3</span>, and 
          <span className="text-accent"> Interactive Web Design</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button 
            onClick={scrollToContact}
            className="bg-accent hover:bg-accent/90 text-white px-8 py-6"
            size="lg"
          >
            Contact Me
          </Button>
          
          <Button 
            onClick={downloadCV}
            disabled={isDownloading}
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10 px-8 py-6"
            size="lg"
          >
            {isDownloading ? 'Downloading...' : 'Download CV'}
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
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
            className="text-primary"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
      
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;

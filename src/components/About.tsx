
import { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    const container = containerRef.current;
    const image = imageRef.current;
    
    if (container) observer.observe(container);
    if (image) observer.observe(image);
    
    return () => {
      if (container) observer.unobserve(container);
      if (image) observer.unobserve(image);
    };
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-accent">Me</span>
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div 
            ref={imageRef}
            className="w-full lg:w-2/5 opacity-0 translate-y-10 transition-all duration-700 ease-out"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden mx-auto border-4 border-accent/20">
                <img 
                  src="/src/assets/official.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -z-10 top-4 left-1/2 transform -translate-x-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-accent/20 blur-xl"></div>
            </div>
          </div>
          
          <div 
            ref={containerRef}
            className="w-full lg:w-3/5 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-300"
          >
            <p className="text-foreground/80 text-lg mb-6">
              Hi, I'm Felix Gishu, a passionate developer specializing in frontend development, AI, and Web3 technologies. My journey in tech began with a curiosity about how digital solutions can solve real-world problems.
            </p>
            
            <p className="text-foreground/80 text-lg mb-6">
              Currently pursuing a BSc in IT at Murang'a University of Technology (2022-2026), I balance my academic pursuits with practical experience, working as a frontend developer at Primus Innovations since March 2025.
            </p>
            
            <p className="text-foreground/80 text-lg">
              I'm particularly interested in the intersection of AI and web technologies, having participated in projects like the 2024 inter-university hackathon where our team developed a traffic light object detection model for Kenyan highways.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="card-highlight p-4 text-center">
                <h4 className="text-accent text-xl font-bold">AI</h4>
                <p className="text-foreground/70">Research & Development</p>
              </div>
              
              <div className="card-highlight p-4 text-center">
                <h4 className="text-primary text-xl font-bold">Web3</h4>
                <p className="text-foreground/70">Blockchain Solutions</p>
              </div>
              
              <div className="card-highlight p-4 text-center">
                <h4 className="text-accent text-xl font-bold">Frontend</h4>
                <p className="text-foreground/70">Interactive UIs</p>
              </div>
              
              <div className="card-highlight p-4 text-center">
                <h4 className="text-primary text-xl font-bold">Databases</h4>
                <p className="text-foreground/70">SQL & NoSQL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

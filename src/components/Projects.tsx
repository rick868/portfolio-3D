
import { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Traffic Light Detection",
    description: "An advanced traffic light detection system for Kenyan highways that performs vehicle density analysis, numberplate recognition, and connects to a mobile app for route optimization and carbon reduction credits.",
    image: "/placeholder.svg",
    tags: ["AI", "Computer Vision", "Mobile App", "TensorFlow"],
    link: "#",
    featured: true
  },
  {
    id: 2,
    title: "Web3 Marketplace",
    description: "A decentralized marketplace for digital assets using blockchain technology, smart contracts, and Web3 integration.",
    image: "/placeholder.svg",
    tags: ["Web3", "Blockchain", "Smart Contracts", "React"],
    link: "#"
  },
  {
    id: 3,
    title: "Interactive Portfolio",
    description: "A 3D interactive portfolio website showcasing frontend development skills and creative design.",
    image: "/placeholder.svg",
    tags: ["Three.js", "React", "Tailwind CSS", "Animation"],
    link: "#"
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with product catalog, shopping cart, and payment integration.",
    image: "/placeholder.svg",
    tags: ["Next.js", "MongoDB", "API", "Payment Gateway"],
    link: "#"
  }
];

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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
    
    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "opacity-0 translate-y-10 transition-all duration-700 ease-out",
        "card-highlight rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all",
        project.featured ? "md:col-span-2" : ""
      )}
      style={{ transitionDelay: `${project.id * 100}ms` }}
    >
      <div className={cn(
        "flex flex-col",
        project.featured ? "md:flex-row" : ""
      )}>
        <div className={cn(
          "overflow-hidden h-48 bg-gradient-to-br from-primary/30 to-accent/30",
          project.featured ? "md:w-1/2 md:h-auto" : ""
        )}>
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity"
          />
        </div>
        
        <div className={cn(
          "p-6",
          project.featured ? "md:w-1/2" : ""
        )}>
          {project.featured && (
            <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-2.5 py-0.5 rounded mb-2">
              Featured Project
            </span>
          )}
          
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          
          <p className="text-foreground/70 mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-secondary text-foreground/90 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              View Project
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, projects.length));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="projects" className="py-20">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 opacity-0 transition-opacity duration-700"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-accent">Projects</span>
        </h2>
        
        <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-12">
          Here's a selection of projects I've worked on, showcasing my skills in AI, Web3, and interactive web design.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {projects.slice(0, visibleCount).map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {visibleCount < projects.length && (
          <div className="text-center">
            <Button 
              onClick={loadMore}
              variant="outline" 
              className="border-accent text-accent hover:bg-accent/10"
            >
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

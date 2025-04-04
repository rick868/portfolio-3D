
import { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'work' | 'education' | 'event';
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: "Frontend Developer",
    organization: "Primus Innovations",
    period: "March 2025 - Present",
    description: "Working as a frontend developer, building responsive web applications and innovative digital solutions.",
    type: 'work'
  },
  {
    id: 2,
    title: "Web3 Developer Workshop",
    organization: "Avalanche",
    period: "March 2025",
    description: "Participated in an intensive workshop on Web3 development, focusing on blockchain applications and smart contract development.",
    type: 'event'
  },
  {
    id: 3,
    title: "Inter-University Hackathon",
    organization: "Traffic Light Object Detection Project",
    period: "2024",
    description: "Developed an AI model for traffic light object detection on Kenyan highways. The system performed vehicle density analysis, numberplate recognition, and connected to a mobile app for route optimization.",
    type: 'event'
  },
  {
    id: 4,
    title: "BSc in Information Technology",
    organization: "Murang'a University of Technology",
    period: "2022 - 2026",
    description: "Pursuing a Bachelor's degree in Information Technology, focusing on software development, AI, and data management.",
    type: 'education'
  }
];

const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
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
    
    if (itemRef.current) observer.observe(itemRef.current);
    
    return () => {
      if (itemRef.current) observer.unobserve(itemRef.current);
    };
  }, []);

  const getTypeStyles = (type: TimelineItem['type']) => {
    switch (type) {
      case 'work':
        return 'bg-accent text-accent-foreground';
      case 'education':
        return 'bg-primary text-primary-foreground';
      case 'event':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div 
      ref={itemRef}
      className={cn(
        "flex flex-col md:flex-row gap-4 md:gap-8 mb-8 last:mb-0",
        "opacity-0 translate-y-10 transition-all duration-700 ease-out"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="md:w-1/3">
        <span className={cn(
          "inline-block rounded px-2.5 py-0.5 text-xs font-semibold mb-2",
          getTypeStyles(item.type)
        )}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
        <h3 className="text-xl font-bold">{item.title}</h3>
        <p className="text-accent">{item.organization}</p>
        <p className="text-foreground/70">{item.period}</p>
      </div>
      
      <div className="md:w-2/3 card-highlight p-4 rounded-lg">
        <p className="text-foreground/80">{item.description}</p>
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    <section id="experience" className="py-20 bg-card/50">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 opacity-0 transition-opacity duration-700"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-accent">Journey</span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {timelineItems.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

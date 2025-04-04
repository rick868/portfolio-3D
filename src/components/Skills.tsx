
import { useRef, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'ai' | 'web3';
}

const skills: Skill[] = [
  { name: 'HTML/CSS', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 85, category: 'frontend' },
  { name: 'React', level: 80, category: 'frontend' },
  { name: 'Next.js', level: 75, category: 'frontend' },
  { name: 'Tailwind CSS', level: 85, category: 'frontend' },
  { name: 'Python', level: 75, category: 'backend' },
  { name: 'Node.js', level: 70, category: 'backend' },
  { name: 'PostgreSQL', level: 75, category: 'backend' },
  { name: 'MySQL', level: 80, category: 'backend' },
  { name: 'MongoDB', level: 70, category: 'backend' },
  { name: 'TensorFlow', level: 65, category: 'ai' },
  { name: 'Computer Vision', level: 70, category: 'ai' },
  { name: 'Solidity', level: 65, category: 'web3' },
  { name: 'Web3.js', level: 60, category: 'web3' },
  { name: 'Blockchain', level: 70, category: 'web3' },
];

const SkillBar = ({ skill }: { skill: Skill }) => {
  const barRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && barRef.current) {
            barRef.current.style.width = `${skill.level}%`;
            barRef.current.style.opacity = '1';
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    if (barRef.current) observer.observe(barRef.current);
    
    return () => {
      if (barRef.current) observer.unobserve(barRef.current);
    };
  }, [skill.level]);

  const getCategoryColor = (category: Skill['category']) => {
    switch (category) {
      case 'frontend':
        return 'bg-primary';
      case 'backend':
        return 'bg-accent';
      case 'ai':
        return 'bg-blue-500';
      case 'web3':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-foreground/90">{skill.name}</span>
        <span className="text-foreground/70">{skill.level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full ${getCategoryColor(skill.category)} transition-all duration-1000 opacity-0`}
          style={{ width: '0%' }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const aiSkills = skills.filter(skill => skill.category === 'ai');
  const web3Skills = skills.filter(skill => skill.category === 'web3');

  return (
    <section id="skills" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-accent">Skills</span>
        </h2>
        
        <div 
          ref={sectionRef}
          className="opacity-0 translate-y-10 transition-all duration-700 ease-out"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="card-highlight p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Frontend Development</h3>
              {frontendSkills.map((skill, index) => (
                <SkillBar key={`frontend-${index}`} skill={skill} />
              ))}
            </div>
            
            <div className="card-highlight p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-accent">Backend & Databases</h3>
              {backendSkills.map((skill, index) => (
                <SkillBar key={`backend-${index}`} skill={skill} />
              ))}
            </div>
            
            <div className="card-highlight p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-500">AI & Machine Learning</h3>
              {aiSkills.map((skill, index) => (
                <SkillBar key={`ai-${index}`} skill={skill} />
              ))}
            </div>
            
            <div className="card-highlight p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-500">Web3 & Blockchain</h3>
              {web3Skills.map((skill, index) => (
                <SkillBar key={`web3-${index}`} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

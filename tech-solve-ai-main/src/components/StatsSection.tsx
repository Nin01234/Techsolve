import { useEffect, useState } from 'react';

const stats = [
  { number: 50000, label: "Problems Solved", suffix: "+" },
  { number: 10000, label: "Verified Guides", suffix: "+" },
  { number: 1000, label: "Video Tutorials", suffix: "+" },
  { number: 99, label: "Success Rate", suffix: "%" }
];

export const StatsSection = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          stats.forEach((stat, index) => {
            const duration = 2000;
            const increment = stat.number / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.number) {
                current = stat.number;
                clearInterval(timer);
              }
              
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(current);
                return newCounters;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="stats-section" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Trusted by Thousands</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Join our growing community of users who have successfully solved their tech problems
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 glass rounded-2xl card-hover"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <span className="gradient-text">
                  {counters[index].toLocaleString()}{stat.suffix}
                </span>
              </div>
              <p className="text-foreground/70 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
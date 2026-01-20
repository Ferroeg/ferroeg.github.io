import Navbar from "@/components/Navbar";
import { BookOpen, Users, Award, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Our Philosophy</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            We believe that systematic reading combined with rigorous debate is the surest path to intellectual maturity.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg prose-neutral dark:prose-invert mx-auto">
          <p className="lead text-2xl font-serif text-primary/80 mb-8 italic">
            "Reading is not just consuming words; it is a dialogue with the greatest minds of history."
          </p>

          <p>
            The Reading Initiation program was founded to provide structure to the often chaotic pursuit of knowledge. 
            We observed that many eager readers jump from topic to topic without building a solid foundation. 
            Our approach fixes this by introducing levels and a curated syllabus.
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
            <div className="p-6 bg-secondary/30 rounded-xl border border-border">
              <h3 className="font-serif text-xl font-bold mb-3 flex items-center text-primary">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm mr-3">1</span>
                First Level
              </h3>
              <p className="text-muted-foreground">
                Foundational texts that introduce core concepts of philosophy, literature, and history. 
                Accessible yet profound, these books are chosen to spark curiosity and build reading stamina.
              </p>
            </div>
            <div className="p-6 bg-secondary/30 rounded-xl border border-border">
              <h3 className="font-serif text-xl font-bold mb-3 flex items-center text-primary">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm mr-3">2</span>
                Advanced Level
              </h3>
              <p className="text-muted-foreground">
                Complex, dense, and challenging works that require patience and analytical skill. 
                Designed for those who have demonstrated commitment and understanding in the First Level.
              </p>
            </div>
          </div>

          <h2 className="font-serif text-3xl font-bold mt-12 mb-6">Why We Debate</h2>
          <p>
            Reading in isolation is only half the work. To truly understand a text, one must articulate its ideas 
            and defend them against scrutiny. Our regular debates are not competitions, but collaborative 
            investigations into truth.
          </p>
          <p>
            We meet after every book to discuss themes, analyze arguments, and relate the text to our contemporary lives.
          </p>
        </div>
        
        <div className="mt-20 pt-12 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
           <div>
             <BookOpen className="w-8 h-8 mx-auto text-primary mb-3" />
             <div className="text-2xl font-bold font-serif">50+</div>
             <div className="text-sm text-muted-foreground">Books Read</div>
           </div>
           <div>
             <Users className="w-8 h-8 mx-auto text-primary mb-3" />
             <div className="text-2xl font-bold font-serif">120+</div>
             <div className="text-sm text-muted-foreground">Active Members</div>
           </div>
           <div>
             <Award className="w-8 h-8 mx-auto text-primary mb-3" />
             <div className="text-2xl font-bold font-serif">2 Levels</div>
             <div className="text-sm text-muted-foreground">Of Progression</div>
           </div>
           <div>
             <Heart className="w-8 h-8 mx-auto text-primary mb-3" />
             <div className="text-2xl font-bold font-serif">∞</div>
             <div className="text-sm text-muted-foreground">Shared Passion</div>
           </div>
        </div>
      </div>
    </div>
  );
}

import { format } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useBooks } from "@/hooks/use-books";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Schedule() {
  const { data: books, isLoading } = useBooks();

  // Filter books that have a debate time
  const scheduledDebates = books
    ?.filter((b) => b.debateTime)
    .sort((a, b) => {
      const dateA = new Date(a.debateTime!).getTime();
      const dateB = new Date(b.debateTime!).getTime();
      return dateA - dateB;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="bg-secondary/30 border-b border-border/40 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Debate Schedule</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Join the conversation. Upcoming discussions on our shared readings.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {isLoading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
            ))
          ) : scheduledDebates && scheduledDebates.length > 0 ? (
            scheduledDebates.map((book) => {
              const debateDate = new Date(book.debateTime!);
              const isPast = debateDate < new Date();

              return (
                <div key={book.id} className={`group relative pl-8 border-l-2 ${isPast ? 'border-border' : 'border-primary'}`}>
                  {/* Timeline dot */}
                  <div className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 bg-background ${isPast ? 'border-muted-foreground/30' : 'border-primary'}`} />
                  
                  <Card className={`transition-colors ${isPast ? 'opacity-70 bg-secondary/20' : 'bg-card hover:border-primary/50'}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        {/* Date Box */}
                        <div className="flex-shrink-0 text-center bg-secondary rounded-lg p-3 min-w-[80px]">
                          <span className="block text-xs uppercase font-bold text-muted-foreground">
                            {format(debateDate, "MMM")}
                          </span>
                          <span className="block text-2xl font-serif font-bold text-foreground">
                            {format(debateDate, "d")}
                          </span>
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                             <Badge variant={isPast ? "outline" : "default"} className={isPast ? "text-muted-foreground" : ""}>
                               {isPast ? "Completed" : "Upcoming"}
                             </Badge>
                             <span className="text-sm text-muted-foreground font-medium flex items-center">
                               <Clock className="w-3.5 h-3.5 mr-1" />
                               {format(debateDate, "h:mm a")}
                             </span>
                          </div>
                          
                          <h3 className="font-serif text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                          
                          <div className="text-sm text-muted-foreground flex items-center mt-4 pt-4 border-t border-border/50">
                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                            Reading Initiation Hall (Online & In-person)
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-muted/20 rounded-2xl">
              <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No debates scheduled</h3>
              <p className="text-muted-foreground">Check back soon for upcoming discussions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

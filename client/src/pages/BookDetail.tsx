import { useRoute, Link } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, BookOpen, User } from "lucide-react";
import { useBook } from "@/hooks/use-books";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookDetail() {
  const [match, params] = useRoute("/books/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: book, isLoading, error } = useBook(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
             <Skeleton className="h-8 w-32 mb-8" />
             <div className="grid md:grid-cols-[300px_1fr] gap-12">
               <Skeleton className="h-[450px] w-full rounded-xl" />
               <div className="space-y-6">
                 <Skeleton className="h-12 w-3/4" />
                 <Skeleton className="h-6 w-1/2" />
                 <Skeleton className="h-32 w-full" />
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Book Not Found</h1>
            <Link href="/books">
              <Button>Return to Library</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/books" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Link>

          <div className="grid md:grid-cols-[350px_1fr] gap-12">
            {/* Book Cover Column */}
            <div className="space-y-6">
              <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl bg-muted border border-border">
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <BookOpen className="w-16 h-16 text-muted-foreground/40" />
                  </div>
                )}
              </div>

              {/* Status Card */}
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Reading Status</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-foreground font-medium capitalize">{book.status}</span>
                  <Badge variant={book.status === 'current' ? 'default' : 'secondary'}>
                    {book.status}
                  </Badge>
                </div>
                
                {book.debateTime && (
                  <div className="pt-4 border-t border-border mt-4">
                    <div className="flex items-start text-primary">
                      <Calendar className="w-5 h-5 mr-3 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">Debate Time</p>
                        <p className="font-medium text-lg">
                          {format(new Date(book.debateTime), "MMMM d, yyyy")}
                        </p>
                        <p className="text-sm opacity-90">
                          {format(new Date(book.debateTime), "h:mm a")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Column */}
            <div>
              <div className="mb-6">
                <Badge variant="outline" className="mb-4 text-primary border-primary/20">
                  {book.level} Level
                </Badge>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                  {book.title}
                </h1>
                <div className="flex items-center text-lg text-muted-foreground">
                  <User className="w-5 h-5 mr-2" />
                  {book.author}
                </div>
              </div>

              <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">About this Book</h3>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {book.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { format } from "date-fns";
import { type Book as BookType } from "@shared/schema";
import { Calendar, Clock, ArrowRight, Book } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: BookType;
}

export default function BookCard({ book }: BookCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
      case "completed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="group flex flex-col overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 bg-card h-full">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary">
            <Book className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={getStatusColor(book.status)} variant="outline">
            {book.status === 'current' ? 'Currently Reading' : book.status}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-5 pb-2">
        <div className="flex justify-between items-start">
           <Badge variant="outline" className="mb-2 uppercase text-[10px] tracking-wider text-muted-foreground">
             {book.level} Level
           </Badge>
        </div>
        <h3 className="font-serif text-xl font-bold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">{book.author}</p>
      </CardHeader>

      <CardContent className="p-5 pt-2 flex-grow">
        <p className="text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed">
          {book.description}
        </p>
      </CardContent>

      <CardFooter className="p-5 pt-0 border-t border-border/40 bg-secondary/20 mt-auto">
        <div className="w-full pt-4 flex items-center justify-between">
          {book.debateTime && (
            <div className="flex items-center text-xs font-medium text-accent">
              <Calendar className="mr-1.5 h-3.5 w-3.5" />
              {format(new Date(book.debateTime), "MMM d, h:mm a")}
            </div>
          )}
          
          <Link href={`/books/${book.id}`} className="ml-auto inline-flex items-center text-xs font-semibold text-primary hover:underline">
            Details <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

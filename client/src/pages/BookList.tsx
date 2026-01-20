import { useState } from "react";
import { BookOpen, Filter } from "lucide-react";
import { useBooks } from "@/hooks/use-books";
import BookCard from "@/components/BookCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BookList() {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Fetch all books, client-side filtering for simplicity given small dataset
  // In a real app with pagination, we'd pass filters to the hook
  const { data: books, isLoading } = useBooks();

  const filteredBooks = books?.filter((book) => {
    if (activeTab === "all") return true;
    return book.level === activeTab;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="bg-secondary/30 border-b border-border/40 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">The Library</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A curated collection of essential readings, organized by initiation level.
            Browse our current syllabus and past archives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-[400px] grid-cols-3 bg-secondary">
              <TabsTrigger value="all">All Levels</TabsTrigger>
              <TabsTrigger value="first">First Level</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Filter className="w-4 h-4 mr-2" />
            Showing {filteredBooks?.length || 0} books
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[450px] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredBooks && filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl bg-secondary/10">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try selecting a different level or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

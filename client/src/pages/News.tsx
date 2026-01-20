import { format } from "date-fns";
import { Calendar, Newspaper } from "lucide-react";
import { useNewsList } from "@/hooks/use-news";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function News() {
  const { data: newsItems, isLoading } = useNewsList();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="bg-primary/5 border-b border-border/40 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Community News</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Announcements, reading updates, and community highlights.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-6">
                <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />
                <div className="space-y-3 w-full">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : newsItems && newsItems.length > 0 ? (
          <div className="space-y-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="overflow-hidden bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="md:flex">
                  {item.imageUrl && (
                    <div className="md:w-1/3 aspect-video md:aspect-auto">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={`p-6 md:w-2/3 ${!item.imageUrl ? "md:w-full" : ""}`}>
                    <div className="flex items-center text-xs text-muted-foreground mb-3 font-medium">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {item.createdAt && format(new Date(item.createdAt), "MMMM d, yyyy")}
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-3 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary/20 rounded-3xl">
            <Newspaper className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-medium text-foreground">No news yet</h3>
            <p className="text-muted-foreground">Stay tuned for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}

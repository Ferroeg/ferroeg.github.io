import { Link } from "wouter";
import { BookX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <BookX className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-xl font-medium text-muted-foreground mb-6">Page Not Found</h2>
        <p className="max-w-md text-muted-foreground mb-8 mx-auto">
          The page you are looking for doesn't exist or has been moved to another shelf in our library.
        </p>
        <Link href="/">
          <Button size="lg">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

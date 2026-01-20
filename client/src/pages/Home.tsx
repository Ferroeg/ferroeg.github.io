import { Link } from "wouter";
import { ArrowRight, Users, BookOpen, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useBooks } from "@/hooks/use-books";
import BookCard from "@/components/BookCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: books, isLoading } = useBooks();

  const currentBooks = books?.filter((b) => b.status === "current") || [];
  const upcomingBooks = books?.filter((b) => b.status === "upcoming") || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 lg:py-32">
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              Systematic Reading <span className="text-primary italic">Initiative</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
              Join our systematic reading initiation program. Two levels of engagement, 
              curated literary masterpieces, and meaningful community debates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/books">
                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Explore Library
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="rounded-full px-8 border-primary/20 text-primary hover:bg-primary/5">
                  View Debate Schedule
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Systematic Reading</h3>
              <p className="text-muted-foreground leading-relaxed">
                Structured path through foundational texts, organized into First and Advanced levels for progressive learning.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Community Growth</h3>
              <p className="text-muted-foreground leading-relaxed">
                Read together, grow together. A supportive environment for intellectual development and shared discovery.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-6 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-700">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Regular Debates</h3>
              <p className="text-muted-foreground leading-relaxed">
                Scheduled discussions after every book to deepen understanding, challenge perspectives, and solidify knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Readings Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">Current Readings</h2>
              <p className="text-muted-foreground mt-2">Books currently being read and discussed.</p>
            </div>
            <Link href="/books">
              <Button variant="ghost" className="hidden sm:flex group">
                View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : currentBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-background rounded-2xl border border-dashed border-border">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No current readings</h3>
              <p className="text-muted-foreground">Check back soon for the next cycle.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="w-8 h-8 mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-2xl font-bold mb-6">Systematic Reading Initiative</h2>
          <div className="flex justify-center gap-8 mb-8 text-sm opacity-80">
            <Link href="/books" className="hover:text-white hover:underline">Library</Link>
            <Link href="/schedule" className="hover:text-white hover:underline">Schedule</Link>
            <Link href="/news" className="hover:text-white hover:underline">News</Link>
            <Link href="/about" className="hover:text-white hover:underline">About</Link>
          </div>
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Reading Initiation Program. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

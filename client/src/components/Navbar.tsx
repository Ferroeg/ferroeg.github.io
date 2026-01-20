import { Link, useLocation } from "wouter";
import { BookOpen, Newspaper, Calendar, Info, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, translations } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const links = [
    { href: "/", label: t.home, icon: null },
    { href: "/books", label: t.library, icon: BookOpen },
    { href: "/schedule", label: t.debates, icon: Calendar },
    { href: "/news", label: t.news, icon: Newspaper },
    { href: "/about", label: t.about, icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6" />
          <span>{t.title}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === link.href
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2"
          >
            <Languages className="h-4 w-4" />
            {language === 'en' ? 'العربية' : 'English'}
          </Button>
        </div>

        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          >
            <Languages className="h-5 w-5" />
          </Button>
          <Link href="/books" className="text-muted-foreground hover:text-primary p-2">
            <BookOpen className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

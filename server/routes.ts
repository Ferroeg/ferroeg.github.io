import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Books API
  app.get(api.books.list.path, async (req, res) => {
    const level = req.query.level as string | undefined;
    const books = await storage.getBooks(level);
    res.json(books);
  });

  app.get(api.books.get.path, async (req, res) => {
    const book = await storage.getBook(Number(req.params.id));
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  });

  app.post(api.books.create.path, async (req, res) => {
    try {
      const input = api.books.create.input.parse(req.body);
      const book = await storage.createBook(input);
      res.status(201).json(book);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // News API
  app.get(api.news.list.path, async (req, res) => {
    const news = await storage.getNews();
    res.json(news);
  });

  app.get(api.news.get.path, async (req, res) => {
    const item = await storage.getNewsItem(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'News item not found' });
    }
    res.json(item);
  });

  app.post(api.news.create.path, async (req, res) => {
    try {
      const input = api.news.create.input.parse(req.body);
      const item = await storage.createNews(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const books = await storage.getBooks();
  if (books.length === 0) {
    console.log("Seeding database...");
    
    // First Level Books
    await storage.createBook({
      title: "The Alchemist",
      author: "Paulo Coelho",
      description: "A novel about a young shepherd who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried in the Pyramids.",
      level: "first",
      coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
      status: "current",
      debateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week from now
    });

    await storage.createBook({
      title: "Atomic Habits",
      author: "James Clear",
      description: "An easy and proven way to build good habits and break bad ones.",
      level: "first",
      coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
      status: "upcoming",
      debateTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 1 month from now
    });

    // Advanced Level Books
    await storage.createBook({
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      description: "The major work of the Nobel Prize winner in Economics, explaining the two systems that drive the way we think.",
      level: "advanced",
      coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
      status: "current",
      debateTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks from now
    });

    await storage.createBook({
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      description: "A survey of the history of humankind from the Stone Age to the very distant future.",
      level: "advanced",
      coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
      status: "completed",
      debateTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 1 month ago
    });

    // News
    await storage.createNews({
      title: "Welcome to the new Reading Initiation website!",
      content: "We are excited to launch this platform to help organize our reading schedules and debates. Check back here for updates.",
      imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800"
    });

    await storage.createNews({
      title: "Upcoming Debate: The Alchemist",
      content: "Don't forget to finish reading The Alchemist by next week. The debate will be held in the main hall.",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
    });
    
    console.log("Database seeded!");
  }
}

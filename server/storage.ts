import { db } from "./db";
import {
  books,
  news,
  type Book,
  type InsertBook,
  type News,
  type InsertNews
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getBooks(level?: string): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  
  getNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  createNews(item: InsertNews): Promise<News>;
}

export class DatabaseStorage implements IStorage {
  async getBooks(level?: string): Promise<Book[]> {
    if (level) {
      return await db.select().from(books).where(eq(books.level, level));
    }
    return await db.select().from(books);
  }

  async getBook(id: number): Promise<Book | undefined> {
    const [book] = await db.select().from(books).where(eq(books.id, id));
    return book;
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const [book] = await db.insert(books).values(insertBook).returning();
    return book;
  }

  async getNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(desc(news.createdAt));
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    const [item] = await db.select().from(news).where(eq(news.id, id));
    return item;
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const [item] = await db.insert(news).values(insertNews).returning();
    return item;
  }
}

export const storage = new DatabaseStorage();

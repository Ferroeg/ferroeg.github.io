import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CreateBookRequest } from "@shared/routes";

export function useBooks(level?: 'first' | 'advanced') {
  return useQuery({
    queryKey: [api.books.list.path, level],
    queryFn: async () => {
      // Construct URL properly with query params
      const url = level 
        ? `${api.books.list.path}?level=${level}`
        : api.books.list.path;
        
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch books");
      return api.books.list.responses[200].parse(await res.json());
    },
  });
}

export function useBook(id: number) {
  return useQuery({
    queryKey: [api.books.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.books.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch book");
      return api.books.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateBookRequest) => {
      const validated = api.books.create.input.parse(data);
      const res = await fetch(api.books.create.path, {
        method: api.books.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.books.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create book");
      }
      return api.books.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.books.list.path] });
    },
  });
}

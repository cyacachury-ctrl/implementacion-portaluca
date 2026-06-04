'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="dni-email" className="text-sm font-medium text-foreground">
          DNI o correo electrónico
        </label>
        <Input
          id="dni-email"
          type="text"
          placeholder="Ej: 42567890 o tu@email.com"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 text-base"
          autoComplete="off"
        />
      </div>
      <Button
        type="submit"
        className="h-12 w-full text-base font-medium"
        disabled={!query.trim() || isLoading}
      >
        <Search className="mr-2 h-4 w-4" />
        {isLoading ? 'Buscando...' : 'Ver estado'}
      </Button>
    </form>
  );
}


import { useState, useEffect } from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = localStorage.getItem('minimalNotes');
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('minimalNotes', JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  const addNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: Date.now() } 
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    isLoading,
  };
}

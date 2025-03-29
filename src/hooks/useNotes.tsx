
import { useState, useEffect } from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  images?: string[]; // Add support for storing images
}

// Helper function to check if Chrome extension API is available
const isChromeExtension = (): boolean => {
  return typeof chrome !== 'undefined' && chrome.storage !== undefined;
};

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes from storage on initial render
  useEffect(() => {
    const loadNotes = async () => {
      try {
        if (isChromeExtension()) {
          // Use Chrome storage if available
          chrome.storage.local.get(['minimalNotes'], (result) => {
            const savedNotes = result.minimalNotes;
            if (savedNotes) {
              setNotes(JSON.parse(savedNotes));
            }
            setIsLoading(false);
          });
        } else {
          // Fallback to localStorage for development
          const savedNotes = localStorage.getItem('minimalNotes');
          if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Save notes to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      if (isChromeExtension()) {
        // Use Chrome storage if available
        chrome.storage.local.set({ minimalNotes: JSON.stringify(notes) });
      } else {
        // Fallback to localStorage for development
        localStorage.setItem('minimalNotes', JSON.stringify(notes));
      }
    }
  }, [notes, isLoading]);

  const addNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      images: [],
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

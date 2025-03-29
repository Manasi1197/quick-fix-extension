
import React, { useState, useEffect } from 'react';
import { useNotes, Note } from '@/hooks/useNotes';
import NoteList from '@/components/NoteList';
import NoteEditor from '@/components/NoteEditor';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { notes, addNote, updateNote, deleteNote, isLoading } = useNotes();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Get the active note object
  const activeNote = activeNoteId 
    ? notes.find(note => note.id === activeNoteId) || null 
    : null;

  // Set the first note as active when notes are loaded
  useEffect(() => {
    if (!isLoading && notes.length > 0 && !activeNoteId) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, isLoading, activeNoteId]);

  const handleAddNote = () => {
    const newNote = addNote();
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    
    // If we deleted the active note, set the first available note as active
    if (id === activeNoteId) {
      const remainingNotes = notes.filter(note => note.id !== id);
      setActiveNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null);
    }
  };

  // Check if we're in a Chrome extension context
  const isExtension = typeof chrome !== 'undefined' && chrome.storage !== undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Adjust layout based on context
  return (
    <div className={`flex flex-col mx-auto ${isExtension ? 'extension-container' : 'min-h-screen max-w-5xl py-6'}`}>
      <Header isExtension={isExtension} />
      
      <div className={`flex-1 flex gap-4 overflow-hidden ${isExtension ? 'extension-layout' : ''}`}>
        {/* Notes sidebar */}
        <div className={`${isExtension ? 'extension-sidebar' : 'w-64'} h-[calc(100%-40px)] overflow-hidden ${isExtension ? 'extension-scrollbar' : ''}`}>
          <NoteList
            notes={notes}
            activeNoteId={activeNoteId}
            onNoteSelect={setActiveNoteId}
            onAddNote={handleAddNote}
            isExtension={isExtension}
          />
        </div>
        
        {/* Note editor */}
        <div className={`flex-1 h-[calc(100%-40px)] border border-border rounded-lg ${isExtension ? 'extension-editor' : 'p-3'} bg-card overflow-hidden`}>
          <NoteEditor
            note={activeNote}
            onUpdate={updateNote}
            onDelete={handleDeleteNote}
            isExtension={isExtension}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;


import React, { useState, useEffect } from 'react';
import { useNotes, Note } from '@/hooks/useNotes';
import NoteList from '@/components/NoteList';
import NoteEditor from '@/components/NoteEditor';
import Header from '@/components/Header';

const Index = () => {
  const { notes, addNote, updateNote, deleteNote, isLoading } = useNotes();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto px-4 py-6">
      <Header />
      
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Notes sidebar */}
        <div className="w-64 h-[calc(100vh-120px)]">
          <NoteList
            notes={notes}
            activeNoteId={activeNoteId}
            onNoteSelect={setActiveNoteId}
            onAddNote={handleAddNote}
          />
        </div>
        
        {/* Note editor */}
        <div className="flex-1 h-[calc(100vh-120px)] border border-border rounded-lg p-4 bg-card">
          <NoteEditor
            note={activeNote}
            onUpdate={updateNote}
            onDelete={handleDeleteNote}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

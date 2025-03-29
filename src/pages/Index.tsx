
import React, { useState, useEffect } from 'react';
import { useNotes, Note } from '@/hooks/useNotes';
import NoteList from '@/components/NoteList';
import NoteEditor from '@/components/NoteEditor';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { notes, addNote, updateNote, deleteNote, isLoading } = useNotes();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'editor'>('list');
  
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
    setView('editor'); // Switch to editor view when creating a new note
  };

  const handleNoteSelect = (id: string) => {
    setActiveNoteId(id);
    setView('editor'); // Switch to editor view when selecting a note
  };

  const handleBackToList = () => {
    setView('list');
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    
    // If we deleted the active note, set the first available note as active
    if (id === activeNoteId) {
      const remainingNotes = notes.filter(note => note.id !== id);
      setActiveNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null);
      // Go back to list view if we just deleted the active note
      setView('list');
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

  return (
    <div className={`flex flex-col mx-auto ${isExtension ? 'extension-container' : 'min-h-screen max-w-5xl py-6'}`}>
      <Header isExtension={isExtension} />
      
      <div className={`flex-1 overflow-hidden ${isExtension ? 'extension-layout px-2' : ''}`}>
        {view === 'list' ? (
          <NoteList
            notes={notes}
            activeNoteId={activeNoteId}
            onNoteSelect={handleNoteSelect}
            onAddNote={handleAddNote}
            isExtension={isExtension}
          />
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-2">
              <Button 
                variant="ghost" 
                size={isExtension ? "xs" : "sm"} 
                onClick={handleBackToList}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft size={isExtension ? 14 : 16} className="mr-1" />
                {isExtension ? "Back" : "Back to notes"}
              </Button>
            </div>
            <div className={`flex-1 border border-border rounded-lg ${isExtension ? 'extension-editor p-2' : 'p-3'} bg-card`}>
              <NoteEditor
                note={activeNote}
                onUpdate={updateNote}
                onDelete={handleDeleteNote}
                isExtension={isExtension}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;


import React, { useState, useEffect, useRef } from 'react';
import { Note } from '@/hooks/useNotes';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface NoteEditorProps {
  note: Note | null;
  onUpdate: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
  isExtension?: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdate, onDelete, isExtension = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  
  // Update local state when active note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  useEffect(() => {
    // Auto-focus the title input when a new note is created
    if (note && !note.title && titleRef.current) {
      titleRef.current.focus();
    }
  }, [note]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (note) {
      onUpdate(note.id, { title: e.target.value });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (note) {
      onUpdate(note.id, { content: e.target.value });
    }
  };

  const handleDelete = () => {
    if (!note) return;
    
    onDelete(note.id);
    toast({
      description: "Note deleted",
      duration: 3000,
    });
  };

  if (!note) {
    return (
      <div className={`h-full flex items-center justify-center text-muted-foreground ${isExtension ? 'text-xs' : 'text-sm'}`}>
        <p>{isExtension ? "Select a note" : "Select a note or create a new one"}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-1">
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled Note"
          className={`font-medium ${isExtension ? 'text-sm' : 'text-lg'} bg-transparent border-none outline-none w-full focus:ring-0 p-0`}
        />
        <Button 
          variant="ghost" 
          size={isExtension ? "xs" : "sm"} 
          onClick={handleDelete}
          className={`text-muted-foreground hover:text-destructive ${isExtension ? 'p-1' : ''}`}
        >
          <Trash2 size={isExtension ? 12 : 16} />
        </Button>
      </div>
      
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing..."
        className={`flex-1 w-full h-full resize-none bg-transparent border-none outline-none focus:ring-0 p-0 text-foreground ${isExtension ? 'text-xs' : 'text-sm'}`}
      />
    </div>
  );
};

export default NoteEditor;

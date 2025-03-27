
import React from 'react';
import Note from './Note';
import { Note as NoteType } from '@/hooks/useNotes';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyState from './EmptyState';

interface NoteListProps {
  notes: NoteType[];
  activeNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onAddNote: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ 
  notes, 
  activeNoteId, 
  onNoteSelect,
  onAddNote
}) => {
  if (notes.length === 0) {
    return <EmptyState onAddNote={onAddNote} />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Notes</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onAddNote}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <PlusCircle size={16} />
          <span>New</span>
        </Button>
      </div>
      
      <div className="overflow-y-auto flex-1 pr-2 -mr-2">
        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            isActive={note.id === activeNoteId}
            onClick={() => onNoteSelect(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;

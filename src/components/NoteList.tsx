
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
  isExtension?: boolean;
}

const NoteList: React.FC<NoteListProps> = ({ 
  notes, 
  activeNoteId, 
  onNoteSelect,
  onAddNote,
  isExtension = false
}) => {
  if (notes.length === 0) {
    return <EmptyState onAddNote={onAddNote} isExtension={isExtension} />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className={`font-medium ${isExtension ? 'text-base' : 'text-lg'}`}>Notes</h2>
        <Button 
          variant="ghost" 
          size={isExtension ? "xs" : "sm"} 
          onClick={onAddNote}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <PlusCircle size={isExtension ? 14 : 16} />
          {!isExtension && <span>New</span>}
        </Button>
      </div>
      
      <div className="overflow-y-auto flex-1 pr-2 -mr-2">
        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            isActive={note.id === activeNoteId}
            onClick={() => onNoteSelect(note.id)}
            isExtension={isExtension}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;

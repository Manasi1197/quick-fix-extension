
import React from 'react';
import { Note as NoteType } from '@/hooks/useNotes';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoteProps {
  note: NoteType;
  isActive: boolean;
  onClick: () => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  isExtension?: boolean;
}

const Note: React.FC<NoteProps> = ({ note, isActive, onClick, onDelete, isExtension = false }) => {
  // Format the created at date
  const formattedDate = formatDistanceToNow(new Date(note.createdAt), { 
    addSuffix: true,
    includeSeconds: true
  });
  
  // Get a truncated version of the content for preview
  const contentPreview = note.content.length > 60 
    ? `${note.content.substring(0, 60)}...` 
    : note.content;
    
  // Use a default title if none exists
  const displayTitle = note.title || 'Untitled Note';

  // Check if note has images
  const hasImages = note.images && note.images.length > 0;
  
  return (
    <div 
      className={cn(
        'rounded-md border border-border mb-2 cursor-pointer transition-colors relative note-card',
        isActive ? 'border-primary bg-primary/5' : 'hover:bg-primary/5 hover:border-primary/30',
        isExtension ? 'p-2 mb-1' : 'p-3'
      )}
      onClick={onClick}
    >
      <div className="note-card-actions">
        <Button
          variant="ghost"
          size="xs"
          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
          onClick={(e) => onDelete(e, note.id)}
          title="Delete note"
        >
          <Trash2 size={12} />
        </Button>
      </div>
      
      <h3 className={cn(
        'font-medium truncate pr-6',
        isExtension ? 'text-xs' : 'text-base mb-1'
      )}>
        {displayTitle}
      </h3>
      
      <p className={cn(
        'text-muted-foreground line-clamp-2',
        isExtension ? 'text-xs mb-1' : 'text-sm mb-1'
      )}>
        {contentPreview || 'No content yet'}
      </p>
      
      <div className="flex justify-between items-center">
        <p className={cn(
          'text-muted-foreground',
          isExtension ? 'text-xs' : 'text-sm'
        )}>
          {formattedDate}
        </p>
        
        {hasImages && (
          <div className={cn(
            'text-muted-foreground flex items-center',
            isExtension ? 'text-xs' : 'text-sm'
          )}>
            <Image size={isExtension ? 10 : 14} className="mr-1" />
            <span>{note.images.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;

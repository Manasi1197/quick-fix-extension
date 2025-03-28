
import React from 'react';
import { Note as NoteType } from '@/hooks/useNotes';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NoteProps {
  note: NoteType;
  isActive: boolean;
  onClick: () => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  isExtension?: boolean;
}

const Note: React.FC<NoteProps> = ({ note, isActive, onClick, onDelete, isExtension = false }) => {
  const isMobile = useIsMobile();
  
  const formattedDate = formatDistanceToNow(new Date(note.createdAt), { 
    addSuffix: true,
    includeSeconds: true
  });
  
  const contentPreview = note.content.length > 60 
    ? `${note.content.substring(0, 60)}...` 
    : note.content;
    
  const displayTitle = note.title || 'Untitled Note';

  const hasImages = note.images && note.images.length > 0;
  
  const iconSize = isExtension || isMobile ? 14 : 16;
  
  return (
    <div 
      className={cn(
        'rounded-md border border-border mb-2 cursor-pointer transition-colors relative note-card',
        isActive ? 'border-primary bg-primary/5' : 'hover:bg-primary/5 hover:border-primary/30'
      )}
      onClick={onClick}
    >
      <div className="p-3">
        <div className="pr-8 relative">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className={cn(
                'font-medium truncate text-left', 
                isExtension ? 'text-xs' : (isMobile ? 'text-sm' : 'text-base mb-1')
              )}>
                {displayTitle}
              </h3>
              
              <p className={cn(
                'text-muted-foreground line-clamp-2 break-all text-left',
                isExtension ? 'text-xs mb-1' : (isMobile ? 'text-xs mb-1' : 'text-sm mb-1')
              )}>
                {contentPreview || 'No content yet'}
              </p>
              
              <p className={cn(
                'text-muted-foreground text-left',
                isExtension ? 'text-xs' : (isMobile ? 'text-xs' : 'text-sm')
              )}>
                {formattedDate}
              </p>
            </div>
            
            {/* Actions container - now positioning both icons in a single container */}
            <div className="absolute right-0 top-0 flex items-center space-x-3">
              {hasImages && (
                <div className={cn(
                  'text-muted-foreground flex items-center',
                  isExtension ? 'text-xs' : (isMobile ? 'text-xs' : 'text-sm')
                )}>
                  <Image size={iconSize} className="mr-1" />
                  <span>{note.images.length}</span>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="xs"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                onClick={(e) => onDelete(e, note.id)}
                title="Delete note"
                aria-label="Delete note"
              >
                <Trash2 size={iconSize} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;

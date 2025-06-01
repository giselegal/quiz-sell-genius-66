
import { Block } from '@/types/editor';

export interface EditableComponentProps {
  content: any;
  onUpdate: (content: any) => void;
}

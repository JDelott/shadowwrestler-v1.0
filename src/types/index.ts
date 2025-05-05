export interface Move {
  id: number;
  name: string;
  duration: number;
  selected?: boolean;
}

export interface Sequence {
  id: number;
  name: string;
  moves: Move[];
} 

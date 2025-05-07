export interface Move {
  id: number;
  name: string;
  duration: number;
  selected?: boolean;
  quantity?: number | "auto";
}

export interface Sequence {
  id: number;
  name: string;
  moves: Move[];
} 

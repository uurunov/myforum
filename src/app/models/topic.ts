export interface Topic {
  id: number;
  title: string;
  user: { id: number };
  active: boolean;
}

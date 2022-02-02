export interface UserComment {
  id: number;
  content: string;
  comment_date: string;
  topic: { id: number };
  user: { id: number; lname: string; fname: string };
  active: boolean;
}

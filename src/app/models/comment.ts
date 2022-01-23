export interface UserComment {
  id: number;
  content: string;
  comment_date: string;
  topicId: number;
  user: { lastname: string };
  active: boolean;
}

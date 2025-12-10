export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  status: boolean;
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

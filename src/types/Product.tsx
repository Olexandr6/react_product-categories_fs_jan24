import { User } from './User';
import { Category } from './Category';

export interface Product {
  category: Category;
  user: User | null;
  id: number;
  name: string;
  categoryId: number;
}

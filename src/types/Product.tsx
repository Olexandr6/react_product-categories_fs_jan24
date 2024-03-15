import { Category } from './Category';
import { User } from './User';

export interface Product {
  category: Category;
  user: User | null;
  id: number;
  name: string;
  categoryId: number;
}

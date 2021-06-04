export interface Category {
  id: number;
  name: string;
  nodeLevel: number;
  subcategories: (Category)[];
}

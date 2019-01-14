export interface ProductInputModel {
  id?: string;
  type: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface ProductTypes {
  value: string;
  viewValue: string;
}

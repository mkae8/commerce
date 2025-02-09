export enum Size {
  Small = "15cm",
  Medium = "20cm",
  Large = "37cm",
  XL = "40cm",
  XXL = "47cm",
}

export type ProductType = {
  _id: string;
  productName: string;
  airline: string;
  description: string;
  price: string;
  image: string[];
  size: string;
  productCategory: string;
  createdAt: Date;
  updatedAt: Date;
};

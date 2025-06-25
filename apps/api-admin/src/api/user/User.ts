import { Order } from "../order/Order";
import { Review } from "../review/Review";

export type User = {
  createdAt: Date;
  email: string | null;
  firstName: string | null;
  id: string;
  isAdmin: boolean;
  lastName: string | null;
  orders?: Array<Order>;
  reviews?: Array<Review>;
  updatedAt: Date;
  username: string;
};

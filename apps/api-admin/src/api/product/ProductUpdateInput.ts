import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { InputJsonValue } from "../../types";
import { OrderUpdateManyWithoutProductsInput } from "./OrderUpdateManyWithoutProductsInput";
import { ReviewUpdateManyWithoutProductsInput } from "./ReviewUpdateManyWithoutProductsInput";

export type ProductUpdateInput = {
  category?: CategoryWhereUniqueInput | null;
  colors?: InputJsonValue;
  description?: InputJsonValue;
  discountedPrice?: number;
  images?: InputJsonValue;
  order?: OrderUpdateManyWithoutProductsInput;
  reviews?: ReviewUpdateManyWithoutProductsInput;
  title?: string;
  titlePrice?: number;
  variants?: InputJsonValue;
};

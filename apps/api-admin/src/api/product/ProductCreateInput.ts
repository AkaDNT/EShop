import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { InputJsonValue } from "../../types";
import { OrderCreateNestedManyWithoutProductsInput } from "./OrderCreateNestedManyWithoutProductsInput";
import { ReviewCreateNestedManyWithoutProductsInput } from "./ReviewCreateNestedManyWithoutProductsInput";

export type ProductCreateInput = {
  category?: CategoryWhereUniqueInput | null;
  colors: InputJsonValue;
  description: InputJsonValue;
  discountedPrice: number;
  images: InputJsonValue;
  order?: OrderCreateNestedManyWithoutProductsInput;
  reviews?: ReviewCreateNestedManyWithoutProductsInput;
  title: string;
  titlePrice: number;
  variants?: InputJsonValue;
};

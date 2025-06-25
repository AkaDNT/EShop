import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";
import { JsonFilter } from "../../util/JsonFilter";
import { FloatFilter } from "../../util/FloatFilter";
import { StringFilter } from "../../util/StringFilter";
import { OrderListRelationFilter } from "../order/OrderListRelationFilter";
import { ReviewListRelationFilter } from "../review/ReviewListRelationFilter";

export type ProductWhereInput = {
  category?: CategoryWhereUniqueInput;
  colors?: JsonFilter;
  description?: JsonFilter;
  discountedPrice?: FloatFilter;
  id?: StringFilter;
  images?: JsonFilter;
  order?: OrderListRelationFilter;
  reviews?: ReviewListRelationFilter;
  title?: StringFilter;
  titlePrice?: FloatFilter;
  variants?: JsonFilter;
};

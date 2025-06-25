import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  ReferenceField,
  TextField,
  DateField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { CATEGORY_TITLE_FIELD } from "../category/CategoryTitle";

export const ProductList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      title={"Products"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <ReferenceField
          label="Category"
          source="category.id"
          reference="Category"
        >
          <TextField source={CATEGORY_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Colors" source="colors" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="Description" source="description" />
        <TextField label="DiscountedPrice" source="discountedPrice" />
        <TextField label="ID" source="id" />
        <TextField label="Images" source="images" />
        <TextField label="Title" source="title" />
        <TextField label="TitlePrice" source="titlePrice" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="Variants" source="variants" />{" "}
      </Datagrid>
    </List>
  );
};

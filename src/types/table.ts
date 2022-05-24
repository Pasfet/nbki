export enum TablePropName {
  ID = "id",
  NAME = "name",
  PRICE = "price",
  COUNT = "count",
  TOTAL = "total",
}

export enum TableSorted {
  ASC = "asc",
  DESC = "desc",
}

export type TableHeadItems = {
  title: string;
  prop: TablePropName;
};

export interface TableItemInterface {
  [TablePropName.ID]: string | number;
  [TablePropName.NAME]: string;
  [TablePropName.PRICE]: number | string;
  [TablePropName.COUNT]: number | string;
  [TablePropName.TOTAL]: number | string;
}

export type Store = {
  id: number;
  name: string;
};

export type FilterData = {
  store?: Store;
};

export type Gender = 'FEMALE' | 'MALE' | 'OTHER';

export type SaleByGender = {
  sum: number;
  gender: Gender;
};

export type PieChartConfig = {
  labels: string[];
  series: number[];
};

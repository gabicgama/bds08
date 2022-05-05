import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { formatPrice } from '../../formatters';
import { buildFilterParameters, makeRequest } from '../../request';
import { FilterData, PieChartConfig, SaleByGender } from '../../types';
import {
  buildPieChartConfig,
  buildSalesByGenderChart,
  sumSalesByGender,
} from './helpers';
import './styles.css';

type Props = {
  filterData?: FilterData;
};

const Sales = ({ filterData }: Props) => {
  const initConfig = {
    series: [],
    labels: [],
  };

  const [salesByGender, setSalesByGender] =
    useState<PieChartConfig>(initConfig);
  const [totalSum, setTotalSum] = useState<number>(0);
  const params = useMemo(() => buildFilterParameters(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SaleByGender[]>('/sales/by-gender', { params })
      .then((response) => {
        const newSalesByGender = buildSalesByGenderChart(response.data);
        setSalesByGender(newSalesByGender);
        setTotalSum(sumSalesByGender(response.data));
      })
      .catch((error) => {
        console.log('Erro ao buscar as vendas por genero. ' + error);
      });
  }, [params]);

  return (
    <div className="sales-container base-card">
      <div className="total-sales-container">
        <h1 className="total-sales">{formatPrice(totalSum)}</h1>
        <span className="label-sales">Total de vendas</span>
      </div>
      <div className="pie-chart-container">
        <ReactApexChart
          options={buildPieChartConfig(salesByGender?.labels, '')}
          type="donut"
          width="280"
          height="280"
          series={salesByGender?.series}
        />
      </div>
    </div>
  );
};

export default Sales;

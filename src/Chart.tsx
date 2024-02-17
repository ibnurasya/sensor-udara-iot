import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getChartValues } from './firebase/get-chart-values';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Periodic ISPU Value',
    },
  },
};

const ChartContainer = styled.div`
  /* position: relative; */
  /* width: 80vw; */
`

const Chart = () => {
  const [data, setData] = useState<ChartData<"line", (number | null)[], unknown>>({
    labels: [''],
    datasets: [],
  })

  useEffect(() => {
    (async () => {
      const { CO, PM_2_5, PM_10 } = (await getChartValues());
      const labels = CO.map(a => format(a.date, 'dd-MMM'))

      CO.reverse()
      PM_2_5.reverse()
      PM_10.reverse()
      labels.reverse()

      const _data = {
        labels,
        datasets: [
          {
            label: 'ISPU PM 2.5',
            data: PM_2_5.map(a => a.value),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'ISPU PM 10',
            data: PM_10.map(a => a.value),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'ISPU CO',
            data: CO.map(a => a.value),
            borderColor: '#000',
            backgroundColor: '#000',
          },
        ],
      };

      setData(_data)
    })()
  }, [])

  return (
    <ChartContainer>
      <Line options={options} data={data} />
    </ChartContainer>
  );
}

export default Chart


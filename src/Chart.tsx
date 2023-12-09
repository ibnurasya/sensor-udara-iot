import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'ISPU PM 2.5',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'ISPU PM 10',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'ISPU CO',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      borderColor: '#000',
      backgroundColor: '#000',
    },
  ],
};

const ChartContainer = styled.div`
  /* position: relative; */
  /* width: 80vw; */
`

const Chart = () => {
  return (
    <ChartContainer>
      <Line options={options} data={data} />
    </ChartContainer>
  );
}

export default Chart


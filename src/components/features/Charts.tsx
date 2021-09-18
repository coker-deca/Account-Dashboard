import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import { Wrapper } from '../templates/style';

export interface ChartInterface {
  name: string;
  amount: number;
}
const Charts: React.FC<{ data: ChartInterface[]; title: string }> = ({
  data,
  title,
}) => {
  return (
    <Wrapper>
      <h2>{title}</h2>
      <BarChart
        width={900}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </Wrapper>
  );
};
export default Charts;

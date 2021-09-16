import { AggregateI } from '../templates/DashboardLayout';
import Total from '../ui/Total';

const Totals = ({totals}: {totals: AggregateI[]}) => {
  return (
    <div className='aggregate'>
      {totals.map((total: AggregateI, index: number) => (
        <Total total={total} key={index} />
      ))}
    </div>
  );
};
export default Totals;

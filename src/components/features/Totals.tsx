import { AggregateI } from '../../pages/Dashboard';
import Total from '../ui/Total';

const Totals = ({totals}: {totals: AggregateI[]}) => {
  return (
    <div className='aggregate'>
      {totals.map((total: AggregateI) => (
        <Total total={total} />
      ))}
    </div>
  );
};
export default Totals;

import { Card } from 'antd';
import { FC } from 'react';
import { useHistory } from 'react-router';

const Totals: FC<{ total: any }> = ({ total }) => {
  const history = useHistory();
  
  return (
    <Card
      title={total.name}
      style={{ width: 200, cursor: 'pointer' }}
      extra={<a href={total.url}>More</a>}
      onClick={()=> history.push(total.url)}
    >
      <h1>{total.amount}</h1>
      <p>{total.name}</p>
    </Card>
  );
};

export default Totals;

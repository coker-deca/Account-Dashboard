import moment from 'moment';
const getDates = () => {
  const firstDay = moment(new Date()).format('YYYY-MM-DD');
  const lastDay = moment(new Date()).add(7,'days').format('YYYY-MM-DD');
  return [firstDay, lastDay]
}

export default getDates;
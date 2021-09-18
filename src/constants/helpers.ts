import moment from 'moment';
import { MapInterface } from '../components/features/Map';

interface CoordValues {
    type: string;
    lat: number;
    long: number;
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const groupBy = (list: any[], prop: string) => {
    return list.reduce((result, currentValue) => {
        (result[currentValue[prop]] = result[currentValue[prop]] || []).push(
            currentValue
        );    
        return result;
    }, {});    
};    
export const groupByDate = (list: any[], dateRange: string[]) => {
    const difference = dateDiffInDays(new Date(dateRange[0]), new Date(dateRange[1]));
    const daysArray = Array.from(Array(difference).keys());
    const allDays: any = {};
    daysArray.forEach(day => allDays[`${day}`] = []);
    const total = list.reduce((result, currentValue) => {
        const findDifference = dateDiffInDays(new Date(dateRange[0]), currentValue['created_at']);
        (result[`${findDifference}`] = result[`${findDifference}`] || []).push(
            currentValue
            );
            return result;
        }, allDays);
    return total;
};    

export const getCoordValues = (array: CoordValues[], zoom = 1): MapInterface[] => array.map((coord) => {
    return { coordinates: [coord.long, coord.lat], zoom }
})

export const getTotalByBranch = (transactions: any) => {
    const transactionsByBranch = groupBy(transactions, "branch");
    const branches = Object.keys(transactionsByBranch);
    const totalByBranch = branches.map((branch) => ({ name: branch, amount: transactionsByBranch[branch].length }));
    return totalByBranch;
}

export const getTotalByDays = (transactions: any, dateRange: string[]) => {
    const transactionsByDays = groupByDate(transactions, dateRange);
    const days = Object.keys(transactionsByDays);
    const totalByDays = days.map((day) => ({ name: 'Day'+day, amount: transactionsByDays[day].length }));
    return totalByDays;
}

export const dateDiffInDays = (a: Date, b: Date) => {
return moment(b).diff(moment(a), 'days')
}

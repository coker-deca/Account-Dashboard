import { MapInterface } from '../components/features/Map';

interface CoordValues {
    type: string;
    lat: number;
    long: number;
}

export const groupBy = (list: any[], prop: string) => {
    return list.reduce((result, currentValue) => {
        (result[currentValue[prop]] = result[currentValue[prop]] || []).push(
            currentValue
        );    
        return result;
    }, {});    
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

export const getTotalByDays = (transactions: any) => {
    const transactionsByBranch = groupBy(transactions, "branch");
    const branches = Object.keys(transactionsByBranch);
    const totalByBranch = branches.map((branch) => ({ name: branch, amount: transactionsByBranch[branch].length }));
    return totalByBranch;
}
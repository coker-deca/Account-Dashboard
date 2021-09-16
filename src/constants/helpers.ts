import { MapInterface } from '../components/features/Map';

export const groupBy = (list: any[], prop: string) => {
    return list.reduce((result, currentValue) => {
        (result[currentValue[prop]] = result[currentValue[prop]] || []).push(
            currentValue
        );
        return result;
    }, {});
};
interface CoordValues {
    type: string;
    lat: number;
    long: number;
}
export const getCoordValues = (array: CoordValues[], zoom = 1): MapInterface[] => array.map((coord) => {
    return { coordinates: [coord.long, coord.lat], zoom }
})
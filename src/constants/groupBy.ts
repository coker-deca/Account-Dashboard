const groupBy = (list: any[], prop: string) => {
    return list.reduce((result, currentValue) => {
        (result[currentValue[prop]] = result[currentValue[prop]] || []).push(
            currentValue
        );
        return result;
    }, {});
};

export default groupBy;
import moment from "moment";

export const calculateDDay = (recruitPeriod: any) => {
    const today: any = new Date();
    const deadLineDay: any = new Date(recruitPeriod);
    const timeDiff = deadLineDay - today;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if (dayDiff == 0) {
        return "-day";
    } else return dayDiff > 0 ? `-${dayDiff}` : `+${Math.abs(dayDiff)}`;
};

export const formatDate = (date: any) => {
    return moment(date).format("YY.MM.DD");
};

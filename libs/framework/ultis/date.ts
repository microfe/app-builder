import * as moment from 'moment';

export const defaultDateFormat = 'DD/MM/YYYY';
export const defaultDateTimeFormat = 'HH:mm DD/MM/YYYY';

export const beginDate = moment('01/01/1900', defaultDateFormat);

export const formatDate = (date: moment.Moment | Date | string | undefined | null, format: string = defaultDateFormat) => {
    if (!date) {
        return null;
    }

    if (moment.isMoment(date)) {
        return date.format(format);
    }

    const dateMoment = moment(date);

    return dateMoment.format(format);
};

export const defaultFormatDate = (date: moment.Moment | Date | string | undefined | null) => formatDate(date, defaultDateFormat);

export const getNextsDaysRange = (days: number): [moment.Moment, moment.Moment] => {
    return [moment().startOf('day'), moment().add(days, 'days').endOf('day')];
};

export const getPreviousDaysRange = (days: number): [moment.Moment, moment.Moment] => {
    return [moment().add(-days, 'days').startOf('day'), moment().add(-1, 'days').endOf('day')];
};

export const startAndEndOfTime = (
    date?: Date | moment.Moment,
    unitOfTime: moment.unitOfTime.StartOf = 'month'
): [moment.Moment, moment.Moment] => {
    const _date = date || new Date;

    return [moment(_date).startOf(unitOfTime), moment(_date).endOf(unitOfTime)];
};

export const isVeryOldDay = (currentMoment: moment.Moment) => {
    if (!currentMoment) {
        return false;
    }

    const beginDateMoment = moment(beginDate).startOf('day');

    return currentMoment <= beginDateMoment;
};

export const isFutureDate = (currentMoment: moment.Moment) => {
    if (isVeryOldDay(currentMoment)) {
        return true;
    }

    const today = new Date();
    const currentMomentDate = currentMoment.toDate();
    if (today < currentMomentDate) {
        return true;
    }

    return false;
};

export const daysBetween = function (date1: Date, date2: Date): number {
    const oneDay = 1000 * 60 * 60 * 24;

    const date1MS = date1.getTime();
    const date2MS = date2.getTime();

    const differenceMS = date1MS - date2MS;

    return Math.round(differenceMS / oneDay);
};

export const isToday = (date: moment.Moment | Date | string) => {
    const now = new Date;
    const target = moment.isMoment(date)
        ? date.toDate()
        : moment.isDate(date) ? date : new Date(date);

    return now.toDateString() === target.toDateString();
};

export const isDayEqualDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
};

export const getCurrentFromTo = () => {
  const currentSearchParams = new URLSearchParams(location.search);

  return {
    from: currentSearchParams.get('from'),
    to: currentSearchParams.get('to')
  };
};

export const getCurrentDateRange = () => {
  const { from, to } = getCurrentFromTo();
  if (from && to) {
    const fromMoment = moment(from).startOf('day');
    const toMoment = moment(to).endOf('day');
    const currentDateRange = [fromMoment, toMoment];

    return currentDateRange as [moment.Moment, moment.Moment];
  }

  return undefined;
};

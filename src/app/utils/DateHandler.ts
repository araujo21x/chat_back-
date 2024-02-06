import AppError from '@errors/AppError';
import errorMessages from '@errors/errorMessages';

class DateHandler {
  static clientFormat(date: Date | string): string {
    if (typeof date === 'string') date = new Date(date);

    return `${this.addZero(date.getDate())}/${this.addZero(
      date.getMonth() + 1
    )}/${date.getFullYear()} às ${this.addZero(date.getHours())}:${this.addZero(
      date.getMinutes()
    )}`;
  }

  static clientFormatNoHours(date: Date | string): string {
    if (typeof date === 'string') date = new Date(date);
    date.setHours(date.getHours() + 3);

    return `${this.addZero(date.getDate())}/${this.addZero(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  }

  static addZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  static extractTime(time: string): { hour: string; minute: string } {
    const matches = time.match(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/);
    if (!matches) throw new AppError(errorMessages.WRONG_TIME_FORMAT, 400);

    const hour: string = matches[1];
    const minute: string = matches[2];

    return { hour, minute };
  }

  static dateTimeGreaterThanNow(date: Date | string, time: string): boolean {
    if (typeof date === 'string') date = new Date(date);
    const { hour, minute } = this.extractTime(time);
    date.setHours(Number(hour), Number(minute));
    const now: Date = new Date();

    if (now.getTime() >= date.getTime()) return false;

    return true;
  }

  static organizeHour(time: string): string {
    const { hour, minute } = this.extractTime(time);

    return `${(hour.length < 2 ? '0' : '') + hour}:${minute}`;
  }
}

export default DateHandler;

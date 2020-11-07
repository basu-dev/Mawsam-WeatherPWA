export default {
getTime(unixtime?: number): { time: string; day: string; date?: string } {
    const a = unixtime > 0 ? new Date(unixtime * 1000) : new Date();
    let hours = a.getHours();
    let sit = 'AM';
    if (hours >= 12) {
      hours = hours - 12;
      sit = 'PM';
    }
    const month = a.toString().split(' ')[1];
    const day = a.getDate();
    return {
      time: `${hours}: ${a.getMinutes()} ${sit}`,
      day: this.parseDay(a.getDay()),
      date: `${month} ${day}`,
    };
  },
  parseDay(day: number): string {
    const days = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
    return days[day];
  }
};

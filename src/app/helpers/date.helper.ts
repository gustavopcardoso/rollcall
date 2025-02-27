
export const getDateWithoutTimeZone = (date: Date): string | null => {
    if (!date) return null;

    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.valueOf() - offset).toISOString().slice(0, -1);
  }

export const combineDateAndTime = (date: Date, time: Date | null, initial: boolean = false): Date | null => {
    if (!date) return null;

    const combinedDate = new Date(date.toDateString());
    if (time) {
      combinedDate.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), 0);
    } else if (initial) {
      combinedDate.setHours(0, 0, 0, 0);
    }
    else {
      combinedDate.setHours(23, 59, 59, 999);
    }

    return combinedDate;
  }
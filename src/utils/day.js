const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const dayName = (number) => {
    const nameOfDay = days.find((n, i) => i === number);
    return nameOfDay;
}
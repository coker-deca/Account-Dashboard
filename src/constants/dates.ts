const currentDate = new Date();
const firstday = new Date(
  currentDate.setDate(currentDate.getDate() - currentDate.getDay())
).toISOString();
const lastday = new Date(
  currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)
).toISOString();
console.log(firstday, lastday);

export {currentDate, firstday, lastday}
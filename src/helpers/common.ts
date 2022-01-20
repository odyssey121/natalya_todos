export const getDateFull = (d: Date): string =>
  d.toLocaleDateString() +
  " | " +
  (d.getHours() < 10 ? "0" : "") +
  d.getHours() +
  ":" +
  (d.getMinutes() < 10 ? "0" : "") +
  d.getMinutes() +
  ":" +
  (d.getSeconds() < 10 ? "0" : "") +
  d.getSeconds();

export default {
  getDateFull,
};

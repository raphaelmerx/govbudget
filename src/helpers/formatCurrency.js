import { formatLocale } from 'd3-format';

export const formatCurrency = (format) => {
  let formatter = formatLocale({ currency: ["€", ""]}).format(format)
  // returns a function that accepts a number and formats it
  return (function(value) {
    return formatter(value).replace(/G/, "B");
  });
}

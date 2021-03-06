import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

const Format = {
  toDollars: (value) => (value ? `${value.toFixed(0)}` : '0'),
  toCents: (value) => (value ? `${value.toFixed(2).split('.')[1]}` : '00'),
  toDollarsDisplay: (value) => {
    const formatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    return formatter.format(value).replace(/A/g, '');
  },
};

export default Format;

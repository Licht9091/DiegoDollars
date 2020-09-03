const Format = {
  toDollars: (value) => (value ? `${value.toFixed(0)}` : '0'),
  toCents: (value) => (value ? `${value.toFixed(2).split('.')[1]}` : '00'),
};

export default Format;

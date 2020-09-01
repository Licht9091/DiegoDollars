const Format = {
  toDollars: (value) => `$${value.toFixed(0)}`,
  toCents: (value) => `${value.toFixed(2).split('.')[1]}`,
};

export default Format;

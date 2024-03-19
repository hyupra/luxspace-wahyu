if (!Number.hasOwnProperty("currency")) {
  // eslint-disable-next-line no-extend-native
  Number.prototype.currency = function (decimals = 0) {
    const options = {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    };

    const currency = new Intl.NumberFormat(navigator.language, options);

    return currency.format(this);
  };
}

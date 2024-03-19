if (!Number.hasOwnProperty("thousand"))
  // eslint-disable-next-line no-extend-native
  Number.prototype.thousand = function (decimals = 0) {
    const thousand = new Intl.NumberFormat(navigator.language);

    return thousand.format(this);
  };

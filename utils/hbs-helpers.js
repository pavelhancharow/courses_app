module.exports = {
  ifeq(a, b, optiions) {
    if (a == b) {
      return optiions.fn(this);
    }
    return optiions.inverse(this);
  }
};
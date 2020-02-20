class Salad {
  constructor(foundation, protein, extra, dressing) {
    this.foundation = foundation;
    this.protein = protein;
    this.extra = extra;
    this.dressing = dressing;
    this.id = Math.random()
      .toString(36)
      .substring(2);
  }

  static price() {
    return (
      (this.foundation.price || 0) +
      (this.protein.price || 0) +
      this.extra.map(item => item.price).reduce((a, b) => a + b, 0) +
      (this.dressing.price || 0)
    );
  }
}

export default Salad;

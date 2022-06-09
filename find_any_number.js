class AI {
  constructor(value) {
    this.desired_value = value;
    this.ratio = 0.5;
    console.log(value);
  }
  right = () => {
    //

    this.ratio = this.ratio / 2;
    console.log("left is now " + this.ratio);
  };

  left = () => {
    this.ratio = this.ratio / 2 + this.ratio;
    console.log("left is now " + this.ratio);
  };

  get_value = () => {
    // Base case

    if (this.ratio === this.desired_value) return;

    // Recur

    if (this.desired_value > this.ratio) {
      this.left();
      this.get_value();
    } else if (this.desired_value < this.ratio) {
      this.right();
      this.get_value();
    }
  };
}

const dope = new AI(0.9315871464064784);
dope.get_value();

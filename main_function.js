const haversine = require("haversine");

class Calculate_ {
  constructor(location) {
    this.location_ = location;
    this.way_points = this.way_points;
    this.left_ratio = 0.5; // Used to estimate distance difference
    this.right_ratio = 0.5;
    this.ratio = 0.5;
    this.way_points_mid = null;
    this.closest_distance = null;
    this.maximun_distance_allowed = 50; // Km allowed veering off
  }

  // Fetch data in the future

  set_way_points = (way_points) => {
    this.way_points = way_points;
    console.log("");

    console.log("array length " + this.way_points.length);
    this.way_points_mid = (this.way_points.length / 2).toFixed();
    console.log("array mid point " + this.way_points_mid);
    console.log("");
  };

  // Increase Ratio

  increase_ratio = () => {
    // A = P( 1 + 0.5)  for right
    // A = P( 1 - 0.5)  for left

    console.log("Old ratio");
    console.log(this.right_ratio);
    console.log("");

    // //
    // this.right_ratio = this.right_ratio + 0.5 * (1 - this.right_ratio);
    // this.left_ratio = this.left_ratio - 0.5 * this.left_ratio;

    this.right_ratio = this.ratio / 2 + this.ratio;

    //to be rremoved
    this.ratio = this.ratio / 2 + this.ratio;

    console.log("Optimized ratio right");
    console.log(this.right_ratio);
    console.log("");
  };

  decrease_ratio = () => {
    console.log("Old ratio");
    console.log(this.left_ratio);
    console.log("");

    this.left_ratio = this.ratio / 2;
    //to be rremoved
    this.ratio = this.ratio / 2;
    console.log("Optimized ratio left");
    console.log(this.left_ratio);
  };
  test_ratio = () => {
    // Base case
    if (this.ratio === 0.371) return;

    // Recur

    // for (var i = 0; i < 10; i++) {
    //   const val = parseInt(Math.random().toFixed());
    //   if (val === 1) this.increase_ratio();
    //   else this.decrease_ratio();
    //   console.log(this.ratio);
    // }

    if (this.ratio > 0.371) {
      this.decrease_ratio();
      this.test_ratio();
    } else if (this.ratio < 0.371) {
      this.increase_ratio();
      this.test_ratio();
    }
  };

  get_left_right_value = () => {
    // A = P( 1 - 0.5)  for left
    //

    const left = (this.way_points_mid * (1 - this.left_ratio)).toFixed();
    const right = (this.way_points_mid * (1 + this.right_ratio)).toFixed();

    console.log("Left value " + left);
    console.log("Right value " + right);
    console.log("");

    // index of the value from the left and right
    return {
      right,
      left,
    };
  };

  get_closest_distance = () => {
    // Use haversine to get distance

    const left_distance = haversine(
      this.current_location,
      this.way_points[this.get_left_right_value().left]
    );

    console.log("");
    const right_distance = haversine(
      this.current_location,
      this.way_points[this.get_left_right_value().right]
    );

    console.log("Right distance " + right_distance);
    console.log("left distance " + left_distance);

    // base cases
    if (
      this.closest_distance &&
      this.closest_distance < this.maximun_distance_allowed
    ) {
      return "on caurse";
    } else if (
      this.closest_distance &&
      (this.closest_distance > right_distance ||
        this.closest_distance > left_distance)
    ) {
      // set closest distance to the closest value

      if (this.closest_distance > right_distance)
        this.closest_distance = right_distance;
      else if (this.closest_distance > left_distance)
        this.closest_distance = left_distance;

      // recursive call
      // this.get_closest_distance()
    } else if (!this.closest_distance) {
      // recursive call
      // this.get_closest_distance()
    }
  };

  // From way points use pass way_points.length / 2 = 50
  // Floor any decimal
}

const current_location = {
  latitude: -26.139324,
  longitude: 27.933666,
};

const data = [
  {
    latitude: -26.153877,
    longitude: 27.927046,
  },
  {
    latitude: -26.150564,
    longitude: 27.928033,
  },
  {
    latitude: -26.148522,
    longitude: 27.928988,
  },
  {
    latitude: -26.146798,
    longitude: 27.929878,
  },
  {
    latitude: -26.144814,
    longitude: 27.930887,
  },
  {
    latitude: -26.142387,
    longitude: 27.932121,
  },
  {
    latitude: -26.139488,
    longitude: 27.933612,
  },
  {
    latitude: -26.136772,
    longitude: 27.935189,
  },
];

//

const cal_ = new Calculate_(current_location);
cal_.set_way_points(data);
// cal_.increase_ratio();
cal_.test_ratio();
// cal_.get_closest_distance();

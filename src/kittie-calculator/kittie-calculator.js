const canSizes = [
  { name: '3.2oz', value: 0.32  },
  { name: '6oz',   value: 0.6  },
  { name: '10oz',  value: 1.0 }
];

class KittieCalculator {
  constructor (target) {
    this.target             = document.querySelector(target);
    this.weightInput        = this.target.querySelector('#cat_weight');
    this.mealInput          = this.target.querySelector('#meal_count');
    this.rangeInput         = this.target.querySelector('#percent_dry');
    this.percentDryTarget   = this.target.querySelector('#output_percent_dry');
    this.percentWetTarget   = this.target.querySelector('#output_percent_wet');
    this.weightOutputTarget = this.target.querySelector('#output-1');
    this.weightOutputTarget_2 = this.target.querySelector('#output-2');
    this.catWeight          = 6;
    this.canSizes            = canSizes;
    this.init();
  }

  init () {
    this.rangeInput.addEventListener('input', this.updateRange.bind(this));
    this.weightInput.addEventListener('input', this.updateWeight.bind(this));
    this.weightInput.value = this.catWeight;
    this.mealInput.value = 2;
    this.weightOutputTarget.innerText = `${softFood(this.catWeight)}oz`;
    document.querySelector('#output-1-context').innerText = `(${this.catWeight}lbs)`;
  }

  updateRange (event) {
    this.percentDryTarget.textContent = event.target.value;
    this.percentWetTarget.textContent = 100 - event.target.value;
    this.updateByFoodType(event);
    // this.findCanSize(event.target.value);
  }
  
  updateByFoodType (event) {
    const percent = percentBy(this.catWeight, event.target.value / 100);
    this.weightOutputTarget_2.innerText = `${percent}oz`;
    document.querySelector('#output-2-context').innerText = `(${(percent / this.mealInput.value).toFixed(2)}oz)`;
  }

  findCanSize (range) {
    // console.log(this.wetPortion);
    for (let size of this.canSizes) {
      console.log(range, size.value);
      console.log(percentBy(this.catWeight, size));
      // this.weightOutputTarget.insertAdjacentHTML('beforeend', `${size.name}`);

    }
  }

  updateWeight (event) {
    this.catWeight = event.target.value;
    this.weightOutputTarget.innerText = `${softFood(this.catWeight)}oz`;
  }




}

function softFood (catWeight) {
  const res =(catWeight * 1.09).toFixed(2);
  console.log('#softFood', res);
  return res;
}

function percentBy (catWeight, percent) {
  console.log('percent', percent);
  const res = (softFood(catWeight) * percent).toFixed(2);
  console.log('#percentBy', res);
  return res;
}

document.addEventListener('DOMContentLoaded', function () {
  window.kittieCalculator = new KittieCalculator('#kittie-calculator');
});

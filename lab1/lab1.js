"use strict";
const { inventory } = require("./inventory.js");

//console.log(inventory);
//onsole.log(inventory['Sallad']);
class Salad {
  constructor() {
    this.foundation = [];
    this.protein = [];
    this.extra = [];
    this.dressing = [];
  }

  add(name, ingredient) {
    if (ingredient.foundation) this.foundation.push({ name, ...ingredient });
    if (ingredient.protein) this.protein.push({ name, ...ingredient });
    if (ingredient.extra) this.extra.push({ name, ...ingredient });
    if (ingredient.dressing) this.dressing.push({ name, ...ingredient });
  }

  remove(name, ingredient) {
    let arr;
    if (ingredient.foundation) arr = this.foundation;
    if (ingredient.protein) arr = this.protein;
    if (ingredient.extra) arr = this.extra;
    if (ingredient.dressing) arr = this.dressing;

    const index = arr.findIndex(v => v.name === name);
    arr.splice(index, 1);
  }

  price() {
    return this.foundation
      .concat(this.protein, this.extra, this.dressing)
      .reduce((acc, curr) => acc + curr.price, 0);
  }
}

class ExtraGreenSalad extends Salad {
  constructor() {
    super();
  }

  price() {
    return (
      this.foundation.reduce((acc, curr) => acc + curr.price, 0) * 1.3 +
      this.protein
        .concat(this.dressing, this.extra)
        .reduce((acc, curr) => acc + curr.price, 0) *
        0.5
    );
  }
}

class GourmetSalad extends Salad {
  constructor() {
    super();
  }

  add(name, ingredient, size = 1) {
    if (ingredient.foundation)
      this.foundation.push({ name, ...ingredient, size });
    if (ingredient.protein) this.protein.push({ name, ...ingredient, size });
    if (ingredient.extra) this.extra.push({ name, ...ingredient, size });
    if (ingredient.dressing) this.dressing.push({ name, ...ingredient, size });
  }

  price() {
    return this.foundation
      .concat(this.protein, this.extra, this.dressing)
      .reduce((acc, curr) => acc + curr.price * curr.size, 0);
  }
}

function showMenu() {
  const acc = { foundation: [], protein: [], extra: [], dressing: [] };
  Object.keys(inventory).forEach(key => {
    if (inventory[key].foundation) acc.foundation.push(key);
    if (inventory[key].protein) acc.protein.push(key);
    if (inventory[key].extra) acc.extra.push(key);
    if (inventory[key].dressing) acc.dressing.push(key);
  });
  Object.keys(acc).forEach(key => console.log(key + ":", acc[key].join(", ")));
}

showMenu();
const salad = new Salad();
salad.add("Sallad + Pasta", inventory["Sallad + Pasta"]);
salad.add("Norsk fjordlax", inventory["Norsk fjordlax"]);
salad.add("Böngroddar", inventory["Böngroddar"]);
salad.add("Pesto", inventory["Pesto"]);
salad.add("Honungsdijon", inventory["Honungsdijon"]);

const extraGreenSalad = new ExtraGreenSalad();
extraGreenSalad.add("Sallad + Pasta", inventory["Sallad + Pasta"]);
extraGreenSalad.add("Norsk fjordlax", inventory["Norsk fjordlax"]);
extraGreenSalad.add("Böngroddar", inventory["Böngroddar"]);
extraGreenSalad.add("Pesto", inventory["Pesto"]);
extraGreenSalad.add("Honungsdijon", inventory["Honungsdijon"]);

const gourmetSalad = new GourmetSalad();
gourmetSalad.add("Sallad + Pasta", inventory["Sallad + Pasta"]);
gourmetSalad.add("Norsk fjordlax", inventory["Norsk fjordlax"], 5);
gourmetSalad.add("Böngroddar", inventory["Böngroddar"], 0);
gourmetSalad.add("Pesto", inventory["Pesto"]);
gourmetSalad.add("Honungsdijon", inventory["Honungsdijon"], -100);

console.log("TOTAL COST SALAD: " + salad.price());
console.log("TOTAL COST EGSALAD: " + extraGreenSalad.price());
console.log("TOTAL COST EGSALAD: " + gourmetSalad.price());

class Queue {
  constructor(){this.items = [];}
  enqueue(item){this.items.push(item);}
  // dequeue() {
  //   if (this.isEmpty()) {
  //     return null;
  //   }
  //   return this.items.shift();
  // }
  // peek() {
  //   if (this.isEmpty()) {
  //     return null;
  //   }
  //   return this.items[0];
  // }
  isEmpty(){return this.items.length === 0;}
  size(){return this.items.length;}
  // clear() {
  //   this.items = [];
  // }
  remove(item) {
    const index = this.items.indexOf(item);
    if (index !== -1)this.items.splice(index, 1);
  }
  at(index) {
    if (index < 0 || index >=this.items.length)return null;
    return this.items[index];
  }
}
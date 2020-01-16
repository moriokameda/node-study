console.log('Hello World');


//no blocking
setTimeout(() => {
  console.log('Hello');
}, 1000);
console.log('World');

//blocking

var start = new Date().getTime();
while (new Date().getTime() < start + 1000) {
  console.log("world");

}

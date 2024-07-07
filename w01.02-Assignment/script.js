console.log(
  "Question 1 - Create a counter in Javascript (counts down from 30 to 0)"
);
for (let i = 30; i >= 0; i--) {
  console.log(i);
}

console.log(
  "Question 2 - Calculate the time it takes between a setTimeout call and the inner function actually running"
);
let startTime = new Date().getTime();
setTimeout(function () {
  let endTime = new Date().getTime();
  console.log("Time takes - ", (endTime - startTime) / 1000, "Seconds");
}, 5000);

console.log(
  "Question 3 - Create a terminal clock - we used iteration to solve this"
);
let clock = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  console.log(`${hours}:${minutes}:${seconds}`);
  setTimeout(clock, 1000);
};
clock();

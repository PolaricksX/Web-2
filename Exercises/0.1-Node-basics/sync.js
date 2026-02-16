function getUserSync(id) {
  const timeStop = Date.now() + 2000;

  while (Date.now() < timeStop) {}

  return { userId: id };
}

const user = getUserSync(1);
console.log(user);

const user2 = getUserSync(2);
console.log(user);

const sum = 1 + 1;
console.log(sum);

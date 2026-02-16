async function getUserAsync(id, callback) {
  setTimeout(() => callback(id), 2000); // Simulate a delay of 2 seconds
}

function callback(id) {
  const user = { userId: id };
  console.log(user);
}
const user1 = getUserAsync(1, callback);

const user2 = getUserAsync(2, callback);

const sum = 1 + 1;

console.log(sum);

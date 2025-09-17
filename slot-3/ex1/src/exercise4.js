// Destructuring assignment với giá trị mặc định và rest parameter 
const ages = [33, 12, 20, 16];
const [first, , third = 0, ...restAges] = ages; //gán giá trị mặc định cho third

console.log(first); // 33
console.log(third); // 20
console.log(restAges); // [16]
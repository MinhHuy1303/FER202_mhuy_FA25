//"Arrow function" là một cách viết ngắn gọn hơn của function expression
const double = (x) => x * 2;
console.log(double(5)); // Should print 10
//cách khác có { } thì phải return
//không có { } thì không cần return
const double2 = function(x) {
    return x * 2;
};
console.log(double2(5)); // Should print 10

const isEven = (x) => x % 2 === 0;
console.log(isEven(4)); // Should print true
console.log(isEven(5)); // Should print false
//cách viết khác 
const isEven2 = function(x) {
    return x % 2 === 0;
}
console.log(isEven2(4)); // Should print true
console.log(isEven2(5)); // Should print false
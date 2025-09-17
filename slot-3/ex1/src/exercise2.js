//tính tổng
const sum = (...numbers) => 
   numbers.filter(n => typeof n === 'number' && !isNaN(n)).reduce((a, b) => a + b, 0);//nếu không có số nào thì trả về 0

console.log(sum(1,2,3,4,5)); // Should print 15
console.log(sum(1, 'a', 3, null, 5)); // Should print 9
console.log(sum()); // Should print 0

//tính trung bình
const average = (...numbers) => {
    const valid = numbers.filter(n => typeof n === 'number' && !isNaN(n)); // lọc ra những số hợp lệ
    return valid.length
        ? (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2)
        : 0; // làm tròn 2 số thập phân
}
console.log(average(1,2,3,4,5)); // Should print 3.00
console.log(average(1, 'a', 3, null, 5)); // Should print 3.00
console.log(average()); // Should print 0

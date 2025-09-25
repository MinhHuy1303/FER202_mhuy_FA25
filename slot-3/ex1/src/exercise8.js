// reduce tính tổng, min, max và phân loại độ tuổi
const ages = [33, 12, 20, 16, 19, 25, 14];


const stats = ages.reduce((acc, age) => {
  acc.total += age; // tính tổng
  acc.min = Math.min(acc.min, age); // tìm giá trị nhỏ nhất
  acc.max = Math.max(acc.max, age); // tìm giá trị lớn nhất
  if (age >= 13 && age <= 19) acc.buckets.teen++; // phân loại tuổi teen
  if (age >= 20) acc.buckets.adult++; // phân loại người lớn
  return acc;
}, { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } }); // giá trị khởi tạo

// In kết quả

console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log(`Buckets: { teen: ${stats.buckets.teen}, adult: ${stats.buckets.adult} }`);
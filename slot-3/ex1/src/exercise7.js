// Spread và Rest operator
const companies = [
  { name: "Company A", category: "Finance", start: 1981, end: 2003 },
  { name: "Company B", category: "Retail",  start: 1992, end: 2008 },
];

// Spread: tạo bản sao bất biến
const company0New = { ...companies[0], start: companies[0].start + 1 };// tăng năm bắt đầu lên 1

// Rest: hàm gộp mảng
const concatAll = (...arrays) => [].concat(...arrays);// gộp tất cả mảng thành một mảng

// In kết quả
console.log("companies[0]:", companies[0]);
console.log("company0New:", company0New);
console.log("concatAll:", concatAll([1, 2], [3], [4, 5]));

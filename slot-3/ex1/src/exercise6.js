// Lấy 3 công ty kết thúc sớm nhất và in tên cùng năm kết thúc
const companies = [
  { name: "Company A", category: "Finance", start: 1981, end: 2003 },
  { name: "Company B", category: "Retail",  start: 1992, end: 2008 },
  { name: "Company C", category: "Auto",    start: 1999, end: 2007 },
  { name: "Company D", category: "Tech",    start: 1989, end: 2010 },
  { name: "Company E", category: "Finance", start: 2009, end: 2014 },
];

const sortedByEnd = [...companies].sort((a, b) => a.end - b.end);// sắp xếp theo năm kết thúc tăng dần
const top3 = sortedByEnd.slice(0, 3);// lấy 3 công ty đầu tiên

top3.forEach(c => console.log(`${c.name} - ${c.end}`));// In tên công ty và năm kết thúc
// Company A - 2003
// Company C - 2007
// Company B - 2008

// Lấy danh sách các công ty trong ngành "Tech"
const techCompanies = companies.filter(c => c.category === "Tech");
console.log("Tech Companies:", techCompanies);
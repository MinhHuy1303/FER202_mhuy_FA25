//Map + filter – danh sách teen (13-19 tuổi) từ mảng đối tượng
const people = [
    { name: 'Ann', age: 19},
    { name: 'Bob', age: 22},
    { name: 'Cindy', age: 15},
    { name: 'David', age: 13},
];

const teens = people
    .filter(p => p.age >= 13 && p.age <= 19) //lọc ra những người trong độ tuổi teen
    .map(p => `${p.name} (${p.age})`); //tạo mảng mới với định dạng "Name (age)"

teens.forEach(t => console.log(t)); // In từng tên trong mảng teens
// Kết quả:
// Ann (19)
// Cindy (15)
// David (13)

// Sắp xếp theo tuổi tăng dần và in ra
const sortedPeople = [...people].sort((a, b) => a.age - b.age);
sortedPeople.forEach(p => console.log(`${p.name} (${p.age})`));

// Lấy tên của 2 người teen đầu tiên
const nameTeens = sortedPeople
.filter(p => p.age >= 13 && p.age <= 19).slice(0, 2) // lấy 2 người đầu tiên
.map(p => p.name).forEach(name => console.log(name))


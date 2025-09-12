// Tạo 1 mảng số nguyên 
const numbers = new Array(1,2,3,4,5,6,7,8,9,10);
console.log(numbers);
// Lọc ra các phần tử chẵn trong mảng sử dụng arrow function
const evenNumbers = numbers.filter(num => num % 2 === 0); // Filter even numbers
console.log(evenNumbers);

// Tạo 1 mảng các đối tượng người với các thuộc tính id, name, age
const people = [
    {id: 1, name: "Alice", age: 25},
    {id: 2, name: "Bob", age: 30},
    {id: 3, name: "Charlie", age: 35},
    {id: 4, name: "David", age: 40}
];
console.log(people);

// Lọc ra những người có age > 30
const peopleOver20 = people.filter(person => person.age > 30);
console.log("Những người có tuổi > 30:");
console.log(peopleOver20);

// Tính tổng số tuổi
const totalAge = people.reduce((sum, person) => sum + person.age, 0);
console.log("Tổng số tuổi:");
console.log(totalAge);
// Exercise 3: Object Destructuring
const person = {
    name: 'Alice',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'Wonderland'
    }
};
//Destructuring lồng nhau + giá trị mặc định
// gán city = 'Unknown' nếu không có city trong object
// gán address = {} để tránh lỗi khi address undefined
const { address: { street, city = 'Unknown'} = {} } = person; // Phân rã lồng nhau với giá trị mặc định
console.log(street); // "123 Main St"
console.log(city); // "Unknown City" nếu không có city
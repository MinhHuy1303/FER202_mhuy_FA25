export default function Exercise5() {
    //Map + filter - danh sách teen (13-19 tuổi) từ mảng objects
    const people = [
        { name: 'Alice', age: 14},
        { name: 'Bob', age: 19},
        { name: 'Charlie', age: 12},
        { name: 'David', age: 22},
        { name: 'Eve', age: 17},
    ]
    const teens = people.filter(person => person.age >= 13 && person.age <= 19) // filter lọc tuổi teen
        .map(teen => teen.name); // map lấy tên của tuổi teen

    const sortedPeople = people.sort((a, b) => a.age - b.age); // sắp xếp theo tuổi tăng dần
    // lấy tên 2 người teens đầu tiên
    const nameTeens = sortedPeople
        .filter(person => person.age >= 13 && person.age <= 19)
        .slice(0, 2) // lấy 2 phần tử đầu tiên
        .map(teen => teen.name); // lấy tên của 2 người teens đầu tiên

    return (
        <div>
            <h2>Exercise 5</h2>
            <p>Danh sách teen (13-19 tuổi): {teens.join(", ")}</p>
            <p>Danh sách people sắp xếp theo tuổi tăng dần:</p>
            <ul>
                {sortedPeople.map((person, index) => (
                    <li key={index}>{person.name} - {person.age} tuổi</li>
                ))}
            </ul>
            <p>Tên 2 người teens đầu tiên: {nameTeens.join(", ")}</p>
        </div>
    )
}
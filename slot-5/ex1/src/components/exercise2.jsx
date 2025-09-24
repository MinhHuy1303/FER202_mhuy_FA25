export function Exercise2() {

    //1.Tạo 1 mảng số nguyên, in ra danh sách list
    const numbers = [1, 12, -3, 4, 15, 20, -10, 8, 7, 6];

    //2.tính tổng
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
   
   //3.Tính trung bình
   const average = sum / numbers.length;

    //4. Khai mảng chuỗi names, in ra danh sách các tên, theo thứ tự tăng dần Alphabet
    const names = ['An', 'Bình', 'Cường', 'Dũng', 'Hà', 
        'Hùng', 'Minh', 'Nam', 'Quân', 'Tuấn'];
        names.sort(); // Sắp xếp mảng names theo thứ tự tăng dần
    
        const students = [
            {id: 1, name: 'An', age: 20, grade: 8.5},
            {id: 2, name: 'Bình', age: 22, grade: 7.0},
            {id: 3, name: 'Cường', age: 21, grade: 9.0},
            {id: 4, name: 'Dũng', age: 23, grade: 6.5},
            {id: 5, name: 'Hà', age: 20, grade: 8.0},
            {id: 6, name: 'Hùng', age: 22, grade: 7.5},
            {id: 7, name: 'Minh', age: 21, grade: 9.5},
            {id: 8, name: 'Nam', age: 23, grade: 6.0},
            {id: 9, name: 'Quân', age: 20, grade: 8.8},
            {id: 10, name: 'Tuấn', age: 22, grade: 7.8},
        ];

        //In danh sách học sinh có điểm >= 7.5, sắp xếp theo grade giảm dần
        const topStudents = students
        .filter(student => student.grade >= 7.5)
        .sort((a, b) => b.grade - a.grade);
        
        
    return (
        <div>
           <h2>Exercise 2</h2>
        <p>Kết quả sum(1,2,3,4,5): {sum}</p>
        <ul>
            {numbers.map((num, index) => (
                <li key={index}> Phần tử thứ {index}-{num}</li>
            ))}
        </ul>
        <p>Tổng các phần tử của mảng: {sum}</p>
        <p>Giá trị Trung bình: {average.toFixed(2)}</p>
        <p>Sắp xếp tên theo bảng chữ cái Alphabet:</p>
        <ul>
            {names.map((name, i) =>
                <li key={i}> {name}</li>
            )}
        </ul>
        <p>Hiển thị danh sách topStudents dưới dạng bảng</p>
        <table border="1" cellPadding="5">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {topStudents.map(student => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.grade}</td>
                        {student.grade >= 9 && <td style={{ color: 'green' }}>👍</td>}
                    </tr>
                ))}
                <tr>
                    <td colSpan="3">Điểm trung bình</td>
                    <td>{(topStudents.reduce((acc, curr) => acc + curr.grade, 0) / topStudents.length).toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}
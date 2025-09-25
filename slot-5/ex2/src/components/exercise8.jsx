export default function Exercise8() {
//reduce tính tổng, min, max và phân loại độ tuổi
const ages = [32, 33, 16, 40, 20, 5, 13, 25, 70, 15];

const stats = ages.reduce((acc, age) => {
    acc.total += age;
    acc.min = Math.min(acc.min, age);
    acc.max = Math.max(acc.max, age);
    if (age >= 13 && age <= 19) acc.bucket.teen++; // phân loại tuổi teen
    if (age >= 20) acc.bucket.adult++; // phân loại tuổi trưởng thành
    return acc;
}, { total: 0, min: Infinity, max: -Infinity, bucket: { teen: 0, adult: 0 } });


    return (
        <div>
            <h2>Exercise 8</h2>
            <p>Danh sách độ tuổi:</p>
            <p> Ages: {ages.join(", ")}</p>
            
            <p>Tổng tuổi: {stats.total}</p>
            <p>Tuổi nhỏ nhất: {stats.min}</p>
            <p>Tuổi lớn nhất: {stats.max}</p>
            <p>Số lượng tuổi teen: {stats.bucket.teen}</p>
            <p>Số lượng người lớn: {stats.bucket.adult}</p>
        </div>
    )
}
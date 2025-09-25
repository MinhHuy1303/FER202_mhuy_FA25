function Exercise4() {
    // mảng với giá trị mặc định destructuring
    const ages = [32, 33, 16, 40, 20, 5];
    const [first, , third = 0, ...rest] = ages; // gán giá trị mặc định cho third

    return (
    <div>
        <h2>Exercise 4</h2>
        <p>Giá trị của first: {first}</p>
        <p>Giá trị mặc định của third: {third}</p> 
        <p>Phần còn lại của mảng: {rest.join(", ")}</p> { /* Sử dụng join để hiển thị mảng dưới dạng chuỗi */ }
    </div>
    )
}
export default Exercise4;
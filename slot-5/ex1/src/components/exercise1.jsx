function Exercise1() {


    //tinh ham double
    const hamDouble = x => x * 2;
    //hàm kiểm tra số chẵn
    const isEven = x => x % 2 === 0;

    return (
        <div>
            <h2>Exercise 1</h2>
            <p>Kết quả hamDouble(5): {hamDouble(5)}</p>
            <p>Kết quả isEven(4): {isEven(4) ? 'Chẵn' : 'Lẻ'}</p>
        </div>
    );
}
export default Exercise1;
export default function Exercise7() {
    // Spread và Rest operator với mảng
    const companies = [
        { name: "Company A", category: "Fiance" ,start: 1981, end: 2004 },
        { name: "Company B", category: "Retail" ,start: 1992, end: 2008 },
        { name: "Company C", category: "Auto" ,start: 1999, end: 2007 },
    ]

    //Spread: Tạo bản sao bất biến
    const companiesCopy = {...companies[0], start: companies[0].start + 1}; // sao chép và thay đổi năm bắt đầu
    //Rest: gộp các phần tử còn lại vào mảng
    const concatAll = (...arrays) => {
        return arrays.reduce((acc, curr) => [...acc, ...curr], []); // sử dụng spread để nối mảng
    }
    return (
        <div>
            <h2>Exercise 7</h2>
            <p>Danh sách công ty ban đầu:</p>
            <ul>
                {companies.map((company, index) => (
                    <li key={index}>
                        {company.name} - {company.category} ({company.start} - {company.end})
                    </li>
                ))}
            </ul>
            <p>Công ty sau khi sao chép và thay đổi năm bắt đầu:</p>
            <ul>
                <li>{companiesCopy.name} - {companiesCopy.category} ({companiesCopy.start} - {companiesCopy.end})</li>
            </ul>
            <p>Kết quả nối mảng sử dụng Rest và Spread:</p>
            <p>{JSON.stringify(concatAll([1, 2], [3, 4], [5]))}</p>
        </div>
    )
}
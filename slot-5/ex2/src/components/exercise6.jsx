export default function Exercise6() {
    // Lấy 3 công ty kết thúc sớm nhất và in tên cùng năm kết thúc
    const companies = [
        { name: "Company A", category: "Fiance" ,start: 1981, end: 2004 },
        { name: "Company B", category: "Retail" ,start: 1992, end: 2008 },
        { name: "Company C", category: "Auto" ,start: 1999, end: 2007 },
        { name: "Company D", category: "Retail" ,start: 1989, end: 2010 },
        { name: "Company E", category: "Technology" ,start: 2009, end: 2014 },
    ] 
    const sortedByEnd = [...companies].sort((a, b) => a.end - b.end); // sắp xếp theo năm kết thúc tăng dần
    const top3 = sortedByEnd.slice(0, 3); // lấy 3 công ty kết thúc sớm nhất

    // Lấy danh sách các công ty trong ngành "Tech"
    const techCompanies = companies.filter(company => company.category === "Technology");
    return (
        <div>
            <h2>Exercise 6</h2>
            <p>Danh sách công ty:</p>
            <ul>
                {companies.map((company, index) => (
                    <li key={index}>{company.name} - {company.category} ({company.start} - {company.end})</li>
                ))}
            </ul>
            
            
            <p>3 công ty kết thúc sớm nhất:</p>
            <ul>
                {top3.map((company, index) => (
                    <li key={index}>{company.name} - Kết thúc năm {company.end}</li>
                ))}
            </ul>
            <p>Các công ty trong ngành "Technology":</p>
            <ul>
                {techCompanies.map((company, index) => (
                    <li key={index}>{company.name} - ({company.start} - {company.end})</li>
                ))}
            </ul>
        </div>
    )
}

function Exercise3() {
    // Destructing lồng nhau với giá trị mặc định
    const person = {
        name: "John",
        age: 30,
        address: {
            street: "123 Main St",
            city: "Hanoi",
            // country is missing
        }
    };
    const {address: {city, country = "Unknown"} = {} } = person;
    return (
        <div>
            <h2>Exercise 3</h2>
        
            <p>City: {city}</p>
            <p>Country: {country}</p>
        </div>
    )
}
export default Exercise3;

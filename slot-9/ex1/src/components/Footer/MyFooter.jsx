import  Button  from "react-bootstrap/Button";
import "./Footer.css"; 

export default function MyFooter({author, email, linkGithub}) {
    return (
        <footer>
            <p>Author: {author}</p>
            <p>Created by: {email}</p>
            <p>&copy; {new Date().getFullYear()} HHMHuy. All rights reserved</p>
            <Button variant="link" href={linkGithub}>My Link Github: {linkGithub}</Button>
        </footer>
    );
}

import  Button  from "react-bootstrap/Button";
import "./Footer.css"; 

export default function MyFooter() {
    return (
        <footer>
            <p>Author: HHMHuy</p>
            <p>Created by: minhhuydtt2k5@gmail.com</p>
            <p>&copy; {new Date().getFullYear()} HHMHuy. All rights reserved</p>
            <Button variant="link" href="https://github.com/MinhHuy1303/FER202_mhuy_FA25">My Link Github's project: Movies Management</Button>
        </footer>
    );
}

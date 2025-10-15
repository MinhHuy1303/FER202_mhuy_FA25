import  Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({author, email, linkGithub}) {
  return (
    <footer>
      <p>Author: minhhuy</p>
      <p>Created by: minhhuydtt2k5@gmail.com </p>
      <p>&copy; {new Date().getFullYear()} HHMH. All rights reserved </p>
      <Button variant="link" href="https://github.com/MinhHuy1303/FER202_mhuy_FA25" >My Link Github: {linkGithub}</Button>
    </footer>
  )
}
export default MyFooter;
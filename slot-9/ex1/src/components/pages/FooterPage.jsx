import  MyFooter  from "../Footer/MyFooter";

export default function FooterPage() {
    return (
        <div className="footer">
            <h2 style={{textAlign: "center", maxWidth: "600px", margin: "0 auto"}}></h2>
            <MyFooter author="HHMHuy" email= "minhhuydtt2k5@gmail.com" linkGithub="Movie Management Project" />
        </div>
    )
}
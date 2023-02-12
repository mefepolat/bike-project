import "./Footer.css"
const Footer = () => {
    return (
        <footer>
       <div class="footer-left">
    <a href="/about">About</a>
    <a href="/">Contact Us</a>
  </div>
  <div class="footer-right">
    <a href="/">
      <i className="fab fa-facebook-square"></i>
    </a>
    <a href="/">
      <i className="fab fa-twitter-square"></i>
    </a>
    <a href="/">
      <i className="fab fa-instagram"></i>
    </a>
  </div>
      </footer>
    )
}

export default Footer;
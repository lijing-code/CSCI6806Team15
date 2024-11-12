<template>
  <footer className="nb-footer ">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="about">
            <div className="social-media">
              <ul className="social-list">
                <!-- Modify Link and icon for the web --- Jiawen Li 141024 -->
                <li><a href="https://github.com/lijing-code/CSCI6806Team15-frontend" title="" target="_blank"><img
                      src="../assets/github.png" /></a></li>
                <li><a href="https://ca.linkedin.com/" title="" target="_blank"><img
                      src="../assets/linkedin.png" /></a></li>
                <li><a href="https://twitter.com/" title="" target="_blank"><img
                      src="../assets/twitter.png" /></a></li>
                <li><a href="https://www.facebook.com/" title="" target="_blank"><img
                      src="../assets/facebook.png" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Space Line --- Jiawen Li 141024 -->
    <br>

    <section className="copyright">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <!-- Modify text --- Jiawen Li 111124 -->
            <p>Copyright © 2024. CSCI6806 Capstone Project Group 15</p>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>
/* Modify icon format --- Jiawen Li 141024 */
.social-list {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 0;
}

.social-list li {
  margin: 0 10px;
}

footer.nb-footer {
  margin-top: 200px;
  background: #32c7f846;
  border-top: 4px solid #0c7fbb;
}

footer.nb-footer .about {
  margin: 0 auto;
  margin-top: 0px;
  max-width: 1170px;
  text-align: center;
}

footer.nb-footer .about p {
  font-size: 13px;
  color: #999;
  margin-top: 0px;
}

footer.nb-footer .about .social-media {
  margin-top: 0px;
}

footer.nb-footer .about .social-media ul li a {
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  font-size: 15px;
  color: #fca552;
}

footer.nb-footer .about .social-media ul li a:hover {
  background: #32c5f8;
  color: #fff;
  border-color: #2cd3dc;
}

footer.nb-footer .footer-info-single {
  margin-top: 0px;
}

footer.nb-footer .footer-info-single .title {
  color: #aaa;
  text-transform: uppercase;
  font-size: 16px;
  border-left: 4px solid #fca552;
  padding-left: 5px;
}

footer.nb-footer .footer-info-single ul li a {
  display: block;
  color: #aaa;
  padding: 2px 0;
}

footer.nb-footer .footer-info-single ul li a:hover {
  color: #fca552;
}

footer.nb-footer .footer-info-single p {
  font-size: 13px;
  line-height: 20px;
  color: #aaa;
}

footer.nb-footer .copyright {
  margin-top: 0px;
  background: #0c7fbb;
  padding: 0px 0;
  color: rgb(255, 255, 255);
}

footer.nb-footer .copyright p {
  margin: 0;
  padding: 0;
}

footer {
  font-family: 'Roboto', sans-serif;
}
</style>

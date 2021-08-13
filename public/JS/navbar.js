// injects css to the page
function loadCSS() {
  var head = document.getElementsByTagName("head")[0];
  var link = (document = document.createElement("link")); // creating a HTML Link element

  link.rel = "stylesheet"; // setting rel attribute to stylesheet
  link.type = "text/css"; // setting type to text/css
  link.href = "../JS/navbar.css"; // setting href to navbar.css
  head.appendChild(link); // adding the link under head tag in html page
}

// injects the html to the page
function loadNavbar() {
  var nav = document.getElementById("nav-tag");
  var navInner = "";
  navInner += `
    <div class="nav_bar">
      <button class="nav_but"><a href="/home">HOME</a></button>
      <button class="nav_but"><a href="https://bmsce.ac.in/home/news/0/protocol-club-is-organizing-protocol-day-2020-from-4th-july-2020-to-5th-july-1">PROTOCOL</a></button>
      <button class="nav_but"><a href="https://bmsce.ac.in/assets/files/MonthlyReports/monthly_report_-_september_2019.pdf">&lt/CodeIO&gt</a></button>
      <button class="nav_but"><a href="/login-select">LOGIN</a></button>
      <div class="topnav_right">
          <button class="nav_but"><a href="/about">ABOUT</a></button>
      </div>
    </div>
    `;
  nav.innerHTML = navInner; // adding above HTML to elemnt with id nav-tag
}

// Calling funcs once window loads
window.onload = function () {
  loadNavbar();
};

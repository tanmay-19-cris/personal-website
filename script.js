document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
        if (this.hostname === window.location.hostname) {
            e.preventDefault();

            document.body.classList.add("slide-out");

            setTimeout(() => {
                window.location.href = this.href;
            }, 500);
        }
    });
});

const menu = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menu.onclick = () => {
    navbar.classList.toggle("active");
};

document.querySelectorAll("#navbar a").forEach(link => {
    link.onclick = () => {
        navbar.classList.remove("active");
    };
});
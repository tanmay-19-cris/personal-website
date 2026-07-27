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
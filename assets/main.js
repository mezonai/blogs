const categoryDropdown = document.getElementById("categoryDropdown");
const overlayModal = document.getElementById("overlayModel");
const closeBtn = document.getElementById("closeBtn");

categoryDropdown.addEventListener("click", () => {
    overlayModal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    overlayModal.classList.remove("active");
});

// Optional: click outside to close
overlayModal.addEventListener("click", (e) => {
    if (e.target === overlayModal) {
        overlayModal.classList.remove("active");
    }
});

const header = document.querySelector('#header');
const menuBar = document.querySelector('.menu__bar');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

menuBar.addEventListener('click', function () {
    if (window.innerWidth < 768) {
        mobileMenu.classList.contains('active')
            ? mobileMenu.classList.remove('active')
            : mobileMenu.classList.add('active');
    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
    }
});

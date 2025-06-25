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

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

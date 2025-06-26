document.addEventListener('DOMContentLoaded', function () {
    const categoryDropdown = document.getElementById('categoryDropdown');
    const overlayModal = document.getElementById('overlayModel');
    const closeBtn = document.getElementById('closeBtn');

    if (categoryDropdown && overlayModal) {
        categoryDropdown.addEventListener('click', () => {
            overlayModal.classList.add('active');
        });
    }

    if (closeBtn && overlayModal) {
        closeBtn.addEventListener('click', () => {
            overlayModal.classList.remove('active');
        });
    }

    // Optional: click outside to close
    if (overlayModal) {
        overlayModal.addEventListener('click', (e) => {
            if (e.target === overlayModal) {
                overlayModal.classList.remove('active');
            }
        });
    }

    const header = document.querySelector('#header');
    const menuBar = document.querySelector('.menu__bar');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    if (menuBar && mobileMenu) {
        menuBar.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                mobileMenu.classList.contains('active')
                    ? mobileMenu.classList.remove('active')
                    : mobileMenu.classList.add('active');
            }
        });
    }

    if (mobileMenu) {
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
            }
        });
    }
});

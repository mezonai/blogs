document.addEventListener('DOMContentLoaded', function () {
    const backToTop = document.getElementById('back-to-top');
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

    document.addEventListener('scroll', () => {
        if (backToTop) {
            backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        }
    });

    if(backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});


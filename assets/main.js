document.addEventListener('DOMContentLoaded', function () {
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

    //handle pagination
    const POSTS_PER_PAGE = 6;
    const posts = [...document.querySelectorAll('[data-post]')];
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

    let currentPage = 1;

    const btnFirst = document.querySelector('.btn-first');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    const btnLast = document.querySelector('.btn-last');
    const pageNumbersWrapper = document.querySelector('.page-numbers');

    function renderPosts() {
        posts.forEach((post, index) => {
            const start = (currentPage - 1) * POSTS_PER_PAGE;
            const end = start + POSTS_PER_PAGE;
            post.style.display = index >= start && index < end ? 'block' : 'none';
        });
    }

    function renderPageNumbers() {
        pageNumbersWrapper.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.classList.add('page-number');
            if (i === currentPage) btn.classList.add('active');

            btn.addEventListener('click', () => {
                currentPage = i;
                renderPosts();
                renderPageNumbers();
                updateButtons();
            });

            pageNumbersWrapper.appendChild(btn);
        }
    }

    function updateButtons() {
        btnFirst.disabled = currentPage === 1;
        btnPrev.disabled = currentPage === 1;
        btnNext.disabled = currentPage === totalPages;
        btnLast.disabled = currentPage === totalPages;
    }

    btnFirst.addEventListener('click', () => {
        currentPage = 1;
        renderPosts();
        renderPageNumbers();
        updateButtons();
    });

    btnPrev.addEventListener('click', () => {
        if (currentPage > 1) currentPage--;
        renderPosts();
        renderPageNumbers();
        updateButtons();
    });

    btnNext.addEventListener('click', () => {
        if (currentPage < totalPages) currentPage++;
        renderPosts();
        renderPageNumbers();
        updateButtons();
    });

    btnLast.addEventListener('click', () => {
        currentPage = totalPages;
        renderPosts();
        renderPageNumbers();
        updateButtons();
    });

    // Initial render
    renderPosts();
    renderPageNumbers();
    updateButtons();
});


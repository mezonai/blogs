document.addEventListener('DOMContentLoaded', function () {
    const categoryDropdown = document.getElementById('categoryDropdown');
    const overlayModal = document.getElementById('overlayModel');
    const closeBtn = document.getElementById('closeBtn');
    const backToTop = document.getElementById('back-to-top');

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

    document.addEventListener('scroll', () => {
        if (backToTop) {
            backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.querySelectorAll("pre > code").forEach((codeBlock, key) => {
    const svgCopy = `
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
    `
    const svgDone = `
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="#1a7f37" data-view-component="true">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
        </svg>
    `
    const button = document.createElement("div");
    const iconBtn = document.createElement("div");
    iconBtn.className = "copy__icon--button-inner";
    button.className = "copy__icon--button";
    button.appendChild(iconBtn);
    iconBtn.innerHTML = svgCopy;

    const pre = codeBlock.parentNode;
    pre.style.display = "flex";
    pre.style.justifyContent = "space-between";

    if(iconBtn) {
        iconBtn.setAttribute("data-clipboard-target", `#code-${key}`);
    }

    if(codeBlock) {
        codeBlock.setAttribute('id', `code-${key}`);
    }

    const clipboard = new ClipboardJS('.copy__icon--button-inner');

    if (clipboard) {
        try {
            clipboard.on('success', function (e) {
                window.getSelection().removeAllRanges();
                e.trigger.innerHTML = svgDone;
                setTimeout(() => (e.trigger.innerHTML = svgCopy), 1500);
            });

            clipboard.on('error', function (e) {
                console.error('Copy failed. Please copy manually.', e);
                alert('Copy failed. Please copy manually!');
            });
        } catch (err) {
            console.error('Clipboard event registration failed:', err);
        }
    }

    pre.appendChild(button);
  });
});


const main = document.querySelector('#main .main-container');
const blogMain = document.querySelector('#main .main-container .blog__main');
const blogs = document.querySelector('#main .main-container .blogs');
const blogList = document.querySelector('#main .main-container .blogs__list');

let posts = [];

const fetchPosts = async () => {
    return await fetch('/data.json')
        .then((response) => response.json())
        .then((data) => {
            return data.posts;
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
        });
};

function clearDetailPost() {
    const postContainer = main.querySelector('.post-container');
    if (postContainer) postContainer.remove();
}

const renderDetailPost = (posts, slug) => {
    clearDetailPost();
    const post = posts.find((post) => post.slug === slug);
    if (post && main) {
        const div = document.createElement('div');
        div.className = 'post-container';
        div.innerHTML = `
            <div class="content__header">
                <div class="content__header-info">
                    <span class="header-info__title">
                        <h1>${post.title}</h1>
                    </span>
                    <div class="header-info__stats">
                        <span class="stats__avatar">
                            <img src="${post.author.avatar}" alt="avatar">
                        </span>
                        <span>
                            <div class="stats__author">By: ${post.author.name}</div>
                            <div class="stats__date">${post.createdAt}</div>
                        </span>
                    </div>
                </div>
                <div class="content__header-banner">
                    <img src="${post.coverImage}" alt="">
                </div>
            </div>
            <div class="content__body">
                ${post.content}
            </div>
        `;
        main.appendChild(div);
    } else if (main) {
        // Có thể hiện thông báo không tìm thấy bài viết nếu muốn
    }
};

const handlePostClick = (post) => {
    window.history.pushState(null, '', `/blogs/${post.slug}`);
    if (blogMain) blogMain.style.display = 'none';
    if (blogs) blogs.style.display = 'none';
    renderDetailPost(posts, post.slug);
};

const renderListPosts = (posts) => {
    if (blogList) {
        blogList.innerHTML = '';
        posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog__card');
            postElement.innerHTML = `
                <img class="blog__card-image" src="${post.coverImage}" alt="banner" />
                <div class="blog__card-content">
                    <div class="content__header">
                        <span class="content__header-author">${post.author.name}</span>
                        <span class="content__header-date">${post.createdAt}</span>
                    </div>
                    <div class="content__body">
                        <div class="content__body-title">${post.title}</div>
                        <div class="content__body-desc">${post.summary}</div>
                    </div>
                </div>
            `;
            blogList.appendChild(postElement);
            postElement.addEventListener('click', () => {
                handlePostClick(post);
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    posts = await fetchPosts();
    renderListPosts(posts);

    window.addEventListener('popstate', function () {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html' || path === '/blogs' || path === '/blogs/') {
            clearDetailPost();
            if (blogMain) blogMain.style.display = 'block';
            if (blogs) blogs.style.display = 'block';
            renderListPosts(posts);
        } else {
            if (blogMain) blogMain.style.display = 'none';
            if (blogs) blogs.style.display = 'none';
            const slug = path.split('/').pop();
            renderDetailPost(posts, slug);
        }
    });
});

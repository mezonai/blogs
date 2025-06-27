# Mezon Blogs with Eleventy (11ty)

A simple, fast, and modern static blog built using [Eleventy (11ty)](https://www.11ty.dev/) — a powerful and flexible static site generator.

## 🚀 Features

-   Markdown-based blog posts
-   Clean and minimal layout
-   SEO-friendly (meta tags, sitemap, etc.)
-   Local development with hot reload

## 🛠️ Tech Stack

-   [Eleventy (11ty)](https://www.11ty.dev/)
-   [Nunjucks](https://mozilla.github.io/nunjucks/)
-   Markdown
-   SCSS / CSS
-   JSON data files

---

## 📂 Project Structure

```plaintext
.
├── _data/             # Global data files (e.g., posts.json)
├── _includes/         # Reusable layout/templates (Nunjucks/HTML)
├── _site/             # Build output (auto-generated)
├── assets/            # Static assets
│   ├── fonts/         # Custom fonts
│   ├── images/        # Images used in posts/templates
│   ├── plugins/       # Optional JS/CSS plugins
│   ├── styles/        # Custom SCSS/CSS styles
│   └── main.js        # Main JS entry point
├── posts/             # Markdown blog posts
├── style.css          # Compiled CSS
├── .eleventy.js       # Eleventy config file
├── index.html         # Main homepage layout
├── package.json       # Project metadata & scripts
└── README.md          # Project documentation
```

## 🚀 Getting Started

Follow these steps to get the blog running locally on your machine.

1. Clone the repository.

```
git clone https://github.com/mezonai/blogs.git
cd blogs
```

2. Install dependencies.

```
npm install
```

3. Run the development server

```
npm run build  // Compile the site once into the _site/ folder
npm run start  // Starts local dev server at http://localhost:8080 with auto-reload
npm run dev    // Same as 'start' but explicitly includes file watching (--watch)

```

4. Add new post.

-   Create a new Markdown file inside the posts/ directory:

```
---
layout: postLayout.html
title: "post-title"
---
Write your content here in **Markdown**.
```

-   Add new data in \_data/post.json

```
example:
{
    "title": "Mezon Webhook Docs",
    "author": "Mezon",
    "url": "posts/mezon-webhook-docs",
    "views": 999,
    "likes": 928
}
```

> [!NOTE]
> your-file-name.md
> The post url must be 'posts/your-file-name'

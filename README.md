<!-- portfolio -->
<!-- slug: rakuen-project -->
<!-- title: Rakuen Project -->
<!-- description: Full-stack web application built with Laravel 11, Inertia.js, and modern frontend stack featuring articles, portfolio, and project management -->
<!-- image: [https://github.com/user-attachments/assets/fac5fb72-2c5c-4eba-9d0e-3be27a81ee3a -->
<!-- tags: laravel, inertia, react, vue, tailwindcss, fullstack, portfolio-cms -->

# Rakuen Project

<img width="986" height="580" alt="image" src="https://github.com/user-attachments/assets/fac5fb72-2c5c-4eba-9d0e-3be27a81ee3a" />

A modern full-stack web application built with Laravel 11 and Inertia.js, featuring a comprehensive content management system for articles, portfolio projects, and image galleries. Designed as a personal portfolio and blogging platform with a clean, professional interface.

## 📋 Overview

**Rakuen Project** is a sophisticated web application that combines the power of Laravel 11 backend with the seamless SPA experience of Inertia.js. It provides a complete solution for managing personal or professional content including blog articles, portfolio projects, image galleries, and more.

## ✨ Features

### Content Management
- **Articles System**: Create, edit, and publish blog posts
- **Portfolio Management**: Showcase personal projects and work
- **Project Gallery**: Detailed project presentations
- **Category Organization**: Organize content with categories
- **Image Management**: Upload and manage media files
- **Rich Text Editor**: Enhanced content creation

### User Features
- **Authentication**: Secure user registration and login (Laravel Breeze)
- **User Profiles**: Manage personal information
- **Email Verification**: Account verification system
- **Password Reset**: Secure password recovery
- **Profile Management**: Update user details and settings

### Technical Features
- **SPA Experience**: Smooth page transitions with Inertia.js
- **Modern Frontend**: React or Vue.js with Tailwind CSS
- **Responsive Design**: Mobile-first, works on all devices
- **SEO Optimized**: Sitemap generation with spatie/laravel-sitemap
- **Image Processing**: Intervention Image for image manipulation
- **Dockerized**: Ready for containerized deployment

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Laravel** | 11.x | Backend framework |
| **PHP** | 8.2+ | Server-side language |
| **Inertia.js** | 1.0+ | SPA framework |
| **React/Vue** | Latest | Frontend framework |
| **Tailwind CSS** | Latest | Utility-first CSS |
| **Vite** | Latest | Asset bundling & HMR |
| **MySQL/PostgreSQL** | - | Database |
| **Laravel Breeze** | 2.0+ | Authentication scaffolding |
| **Intervention Image** | 3.9+ | Image processing |
| **Ziggy** | 2.0+ | Laravel routes in JavaScript |
| **Pest PHP** | 2.0+ | Testing framework |

## 📁 Project Structure

```
rakuen-project/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── ArticlesController.php
│   │       ├── CategoryController.php
│   │       ├── HomepageController.php
│   │       ├── ImagesController.php
│   │       ├── PortofolioController.php
│   │       ├── ProjectsController.php
│   │       └── ProfileController.php
│   └── Models/
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── js/
│   │   ├── Pages/              # Inertia pages
│   │   ├── Components/         # Reusable components
│   │   └── app.jsx/app.vue    # Entry point
│   └── css/
│       └── app.css            # Tailwind CSS
├── routes/
│   ├── web.php                # Application routes
│   └── api.php               # API routes
├── public/                    # Public assets
├── storage/                   # Uploaded files
├── docker-compose.yml         # Docker configuration
├── Dockerfile                # Docker image
├── tailwind.config.js        # Tailwind config
├── vite.config.js           # Vite config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **PHP 8.2** or higher
- **Composer** (latest version)
- **Node.js 18+** and npm/yarn
- **MySQL** or **PostgreSQL**
- **Docker** (optional, for containerized deployment)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd rakuen-project
   ```

2. **Install PHP Dependencies**
   ```bash
   composer install
   ```

3. **Install Node Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Environment Configuration**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Generate application key:
   ```bash
   php artisan key:generate
   ```
   
   Configure database in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=rakuen_db
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **Database Setup**
   
   Run migrations:
   ```bash
   php artisan migrate
   ```
   
   (Optional) Seed database with sample data:
   ```bash
   php artisan db:seed
   ```

6. **Create Storage Link**
   ```bash
   php artisan storage:link
   ```

7. **Build Frontend Assets**
   
   Development:
   ```bash
   npm run dev
   ```
   
   Production:
   ```bash
   npm run build
   ```

8. **Start Development Server**
   ```bash
   php artisan serve
   ```

9. **Access the Application**
   ```
   http://localhost:8000
   ```

### Docker Deployment

Using Docker and Docker Compose:

1. **Build and Start**
   ```bash
   docker-compose up -d --build
   ```

2. **Run Migrations**
   ```bash
   docker-compose exec app php artisan migrate
   ```

3. **Access Application**
   ```
   http://localhost
   ```

## 💻 Usage Guide

### Articles Management

1. **Create Article**
   - Navigate to Articles section
   - Click "New Article"
   - Enter title, content, category
   - Add featured image
   - Publish or save as draft

2. **Edit Article**
   - Select article from list
   - Click "Edit"
   - Modify content
   - Update and publish

3. **Organize with Categories**
   - Create categories
   - Assign articles to categories
   - Filter articles by category

### Portfolio Management

1. **Add Project**
   - Go to Portfolio section
   - Click "Add Project"
   - Enter project details:
     - Title
     - Description
     - Technologies used
     - Project URL
     - GitHub link
     - Screenshots/images
   - Save project

2. **Update Projects**
   - Edit existing projects
   - Update screenshots
   - Modify descriptions

### Image Gallery

1. **Upload Images**
   - Access Images section
   - Upload single or multiple images
   - Add captions and alt text
   - Organize in galleries

2. **Image Processing**
   - Automatic resizing
   - Thumbnail generation
   - Format optimization

## 🎨 Frontend Development

### Inertia.js Pages

Pages are located in `resources/js/Pages/`:

```jsx
// Example: Articles/Index.jsx
import { Head, Link } from '@inertiajs/react'

export default function Index({ articles }) {
    return (
        <>
            <Head title="Articles" />
            <div className="max-w-7xl mx-auto">
                {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </>
    )
}
```

### Tailwind CSS

Custom styles in `resources/css/app.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .btn-primary {
        @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;
    }
}
```

## 🔒 Authentication

Laravel Breeze provides:
- Registration
- Login/Logout
- Password reset
- Email verification
- Profile management

Access auth routes:
- `/register` - User registration
- `/login` - User login
- `/forgot-password` - Password reset

## 📡 API Routes

Define API endpoints in `routes/api.php` for external integrations or mobile apps.

## 🧪 Testing

Run tests with  Pest:

```bash
# Run all tests
./vendor/bin/pest

# Run specific test
./vendor/bin/pest tests/Feature/ArticlesTest.php

# With coverage
./vendor/bin/pest --coverage
```

## 🐛 Troubleshooting

**Inertia Version Mismatch**
```bash
npm install @inertiajs/react@latest @inertiajs/inertia@latest
# or for Vue
npm install @inertiajs/vue3@latest @inertiajs/inertia@latest
```

**Vite Not Starting**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Image Upload Issues**
```bash
# Check storage permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Recreate storage link
php artisan storage:link
```

## 🚀 Deployment

### Production Optimization

```bash
# Optimize autoloader
composer install --optimize-autoloader --no-dev

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Build assets
npm run build
```

### Environment Setup

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database
DB_CONNECTION=mysql
# ... production credentials

# Mail
MAIL_MAILER=smtp
# ... mail settings
```

## 📚 Key Laravel 11 Features Used

- **Simplified Routes**: Streamlined route definitions
- **Improved Performance**: Enhanced query optimization
- **Modern PHP**: PHP 8.2+ features
- **Enhanced Security**: Latest security patches
- **Better Testing**: Pest PHP integration
- **Type Safety**: Improved type hinting

## 🎯 Use Cases

- Personal portfolio website
- Professional blog
- Project showcase platform
- Content management system
- Articles and news publication
- Image gallery site

## 🤝 Contributing

Contributions welcome! Please follow:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

This project is also available under the MIT License.

## 🙏 Acknowledgments

- Laravel community for the amazing framework
- Inertia.js team for seamless SPA experience
- All contributors and supporters

## 📞 Support

For questions or support:
- Open an issue in the repository
- Check Laravel documentation
- Visit Inertia.js docs

---

**Built with Laravel 11 & Inertia.js** 🚀✨  
A Modern Full-Stack Portfolio & CMS Platform!

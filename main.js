// Wallpaper Studio - Main JavaScript File
// Interactive wallpaper gallery with advanced animations and effects

class WallpaperStudio {
    constructor() {
        this.wallpapers = [];
        this.filteredWallpapers = [];
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.initializeWallpapers();
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeBackground();
        this.initializeCarousel();
        this.renderWallpapers();
        this.animateCounters();
    }

    initializeWallpapers() {
        // Wallpaper database with comprehensive metadata
        this.wallpapers = [
            {
                id: 'liquid-metal-abstract',
                title: 'Liquid Metal Flow',
                category: 'abstract',
                tags: ['fluid', 'metallic', 'organic'],
                colors: ['#9caf88', '#2d2d2d', '#d4a5a5'],
                resolutions: ['1920x1080', '2560x1440', '3840x2160'],
                source: 'resources/liquid-metal-abstract.png',
                popularity: 95,
                description: 'Sophisticated abstract wallpaper featuring flowing liquid metal textures'
            },
            {
                id: 'biophilic-eucalyptus',
                title: 'Eucalyptus Serenity',
                category: 'biophilic',
                tags: ['botanical', 'natural', 'organic'],
                colors: ['#9caf88', '#faf9f6', '#7a9471'],
                resolutions: ['1920x1080', '2560x1440', '3840x2160'],
                source: 'resources/biophilic-eucalyptus.png',
                popularity: 88,
                description: 'Minimalist biophilic design featuring delicate eucalyptus branches'
            },
            {
                id: 'dark-forest-aurora',
                title: 'Forest Aurora',
                category: 'dark',
                tags: ['moody', 'atmospheric', 'mystical'],
                colors: ['#1a1a1a', '#9caf88', '#d4a5a5'],
                resolutions: ['1920x1080', '2560x1440', '3840x2160'],
                source: 'resources/dark-forest-aurora.png',
                popularity: 92,
                description: 'Dark aesthetic wallpaper featuring a moody forest scene with aurora'
            },
            {
                id: 'geometric-triangles',
                title: 'Geometric Harmony',
                category: 'geometric',
                tags: ['mathematical', 'architectural', 'modern'],
                colors: ['#2d2d2d', '#9caf88', '#faf9f6'],
                resolutions: ['1920x1080', '2560x1440', '3840x2160'],
                source: 'resources/geometric-triangles.png',
                popularity: 85,
                description: 'Geometric abstract wallpaper featuring interconnected triangular patterns'
            },
            {
                id: 'mountain-landscape',
                title: 'Mountain Vista',
                category: 'nature',
                tags: ['landscape', 'serene', 'atmospheric'],
                colors: ['#9caf88', '#d4a5a5', '#1a1a1a'],
                resolutions: ['1920x1080', '2560x1440', '3840x2160'],
                source: 'resources/mountain-landscape.png',
                popularity: 90,
                description: 'Serene mountain landscape wallpaper at golden hour'
            },
            {
                id: 'ocean-waves-abstract',
                title: 'Oceanic Flow',
                category: 'abstract',
                tags: ['fluid', 'calming', 'organic'],
                colors: ['#9caf88', '#d4a5a5', '#faf9f6'],
                resolutions: ['1920x1080', '2560x1440', '3840x2160'],
                source: 'resources/ocean-waves-abstract.png',
                popularity: 87,
                description: 'Minimalist abstract wallpaper featuring organic flowing shapes'
            },
            // Additional wallpapers from search results
            {
                id: 'geometric-pattern-1',
                title: 'Triangle Matrix',
                category: 'geometric',
                tags: ['geometric', 'modern', 'angular'],
                colors: ['#2d2d2d', '#9caf88', '#faf9f6'],
                resolutions: ['1920x1080', '2560x1440'],
                source: 'https://kimi-web-img.moonshot.cn/img/img.pixers.pics/8a079eb8fce011d3f90b33e3fc6563887f08be4a.jpg',
                popularity: 78,
                description: 'Bold geometric triangle pattern wallpaper'
            },
            {
                id: 'abstract-flow-1',
                title: 'Abstract Waves',
                category: 'abstract',
                tags: ['fluid', 'dynamic', 'colorful'],
                colors: ['#d4a5a5', '#9caf88', '#2d2d2d'],
                resolutions: ['1920x1080', '2560x1440'],
                source: 'https://kimi-web-img.moonshot.cn/img/img.freepik.com/8e543daee876945d64aa910fb181c0fdd7451a74.jpg',
                popularity: 82,
                description: 'Dynamic abstract wallpaper with flowing wave patterns'
            },
            {
                id: 'desert-minimal',
                title: 'Desert Minimal',
                category: 'nature',
                tags: ['minimal', 'desert', 'serene'],
                colors: ['#faf9f6', '#d4a5a5', '#9caf88'],
                resolutions: ['1920x1080', '2560x1440'],
                source: 'https://kimi-web-img.moonshot.cn/img/eskipaper.com/a5a6aeb8dee8e3969bc6145da6d482e173ce54f3.jpg',
                popularity: 75,
                description: 'Minimalist desert landscape wallpaper'
            },
            {
                id: 'forest-path',
                title: 'Forest Path',
                category: 'nature',
                tags: ['forest', 'peaceful', 'natural'],
                colors: ['#7a9471', '#2d2d2d', '#faf9f6'],
                resolutions: ['1920x1080', '2560x1440'],
                source: 'https://kimi-web-img.moonshot.cn/img/www.publicdomainpictures.net/42662d0775e28377bc2b3c8b629229e38a5c0064.jpg',
                popularity: 89,
                description: 'Peaceful forest path wallpaper with natural lighting'
            },
            {
                id: 'ocean-abstract',
                title: 'Ocean Abstract',
                category: 'abstract',
                tags: ['ocean', 'fluid', 'blue'],
                colors: ['#9caf88', '#2d2d2d', '#d4a5a5'],
                resolutions: ['1920x1080', '2560x1440'],
                source: 'https://kimi-web-img.moonshot.cn/img/images.stockcake.com/79a3c00a2641490fb0a0ba82a9c52c746d4a8c0e.jpg',
                popularity: 84,
                description: 'Abstract ocean waves wallpaper with artistic interpretation'
            }
        ];

        this.filteredWallpapers = [...this.wallpapers];
    }

    setupEventListeners() {
        // Category filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.handleCategoryFilter(e.target.dataset.category);
                this.updateActiveTab(e.target);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterWallpapers();
            this.renderWallpapers();
        });

        // Wallpaper card interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-btn')) {
                const action = e.target.dataset.action;
                const wallpaperId = e.target.closest('.wallpaper-card').dataset.id;
                this.handleWallpaperAction(action, wallpaperId);
            }
        });

        // Featured collection cards
        document.querySelectorAll('.featured-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const collection = e.currentTarget.dataset.collection;
                this.handleCollectionClick(collection);
            });
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    initializeAnimations() {
        // Initialize Splitting.js for text animations
        if (typeof Splitting !== 'undefined') {
            Splitting();
        }

        // Animate hero title
        anime({
            targets: '.hero-title .char',
            translateY: [100, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1200,
            delay: (el, i) => 100 + 30 * i
        });

        // Animate hero subtitle
        anime({
            targets: '.hero-subtitle',
            translateY: [30, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: 600
        });

        // Animate filter section
        anime({
            targets: '.filter-tabs .filter-tab',
            translateY: [20, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: (el, i) => 800 + 100 * i
        });

        // Animate search bar
        anime({
            targets: '.search-bar',
            scale: [0.9, 1],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: 1000
        });
    }

    initializeBackground() {
        // Initialize p5.js background animation
        if (typeof p5 !== 'undefined') {
            new p5((p) => {
                let particles = [];
                let time = 0;

                p.setup = () => {
                    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                    canvas.parent('bgCanvas');
                    
                    // Create particles
                    for (let i = 0; i < 50; i++) {
                        particles.push({
                            x: p.random(p.width),
                            y: p.random(p.height),
                            size: p.random(2, 8),
                            speedX: p.random(-0.5, 0.5),
                            speedY: p.random(-0.5, 0.5),
                            opacity: p.random(0.1, 0.3)
                        });
                    }
                };

                p.draw = () => {
                    p.clear();
                    time += 0.01;

                    // Draw flowing particles
                    particles.forEach((particle, index) => {
                        // Update position
                        particle.x += particle.speedX + Math.sin(time + index) * 0.2;
                        particle.y += particle.speedY + Math.cos(time + index) * 0.2;

                        // Wrap around edges
                        if (particle.x < 0) particle.x = p.width;
                        if (particle.x > p.width) particle.x = 0;
                        if (particle.y < 0) particle.y = p.height;
                        if (particle.y > p.height) particle.y = 0;

                        // Draw particle
                        p.fill(156, 175, 136, particle.opacity * 255);
                        p.noStroke();
                        p.ellipse(particle.x, particle.y, particle.size);
                    });

                    // Draw connecting lines
                    for (let i = 0; i < particles.length; i++) {
                        for (let j = i + 1; j < particles.length; j++) {
                            const dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                            if (dist < 100) {
                                const alpha = p.map(dist, 0, 100, 0.1, 0);
                                p.stroke(156, 175, 136, alpha * 255);
                                p.strokeWeight(1);
                                p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                            }
                        }
                    }
                };

                p.windowResized = () => {
                    p.resizeCanvas(p.windowWidth, p.windowHeight);
                };
            });
        }
    }

    initializeCarousel() {
        if (typeof Splide !== 'undefined') {
            new Splide('#featuredCarousel', {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '2rem',
                autoplay: true,
                interval: 4000,
                pauseOnHover: true,
                breakpoints: {
                    1024: { perPage: 2 },
                    768: { perPage: 1 }
                }
            }).mount();
        }
    }

    handleCategoryFilter(category) {
        this.currentCategory = category;
        this.filterWallpapers();
        this.renderWallpapers();
    }

    updateActiveTab(activeTab) {
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        activeTab.classList.add('active');
    }

    filterWallpapers() {
        this.filteredWallpapers = this.wallpapers.filter(wallpaper => {
            const matchesCategory = this.currentCategory === 'all' || wallpaper.category === this.currentCategory;
            const matchesSearch = this.searchTerm === '' || 
                wallpaper.title.toLowerCase().includes(this.searchTerm) ||
                wallpaper.tags.some(tag => tag.toLowerCase().includes(this.searchTerm)) ||
                wallpaper.description.toLowerCase().includes(this.searchTerm);
            
            return matchesCategory && matchesSearch;
        });
    }

    renderWallpapers() {
        const galleryGrid = document.getElementById('galleryGrid');
        
        // Fade out current wallpapers
        anime({
            targets: '.wallpaper-card',
            opacity: 0,
            scale: 0.8,
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                galleryGrid.innerHTML = '';
                
                // Render new wallpapers
                this.filteredWallpapers.forEach((wallpaper, index) => {
                    const card = this.createWallpaperCard(wallpaper);
                    galleryGrid.appendChild(card);
                });

                // Animate in new wallpapers
                anime({
                    targets: '.wallpaper-card',
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    translateY: [20, 0],
                    duration: 600,
                    delay: (el, i) => i * 100,
                    easing: 'easeOutExpo'
                });
            }
        });
    }

    createWallpaperCard(wallpaper) {
        const card = document.createElement('div');
        card.className = 'wallpaper-card';
        card.dataset.id = wallpaper.id;
        
        card.innerHTML = `
            <img src="${wallpaper.source}" alt="${wallpaper.title}" class="wallpaper-image" loading="lazy">
            <div class="wallpaper-overlay">
                <h3 class="overlay-title">${wallpaper.title}</h3>
                <div class="overlay-actions">
                    <button class="action-btn" data-action="preview">Preview</button>
                    <button class="action-btn" data-action="customize">Customize</button>
                    <button class="action-btn" data-action="download">Download</button>
                </div>
            </div>
        `;

        return card;
    }

    handleWallpaperAction(action, wallpaperId) {
        const wallpaper = this.wallpapers.find(w => w.id === wallpaperId);
        
        switch (action) {
            case 'preview':
                this.showPreview(wallpaper);
                break;
            case 'customize':
                this.customizeWallpaper(wallpaper);
                break;
            case 'download':
                this.downloadWallpaper(wallpaper);
                break;
        }
    }

    showPreview(wallpaper) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
        modal.style.background = 'rgba(26, 26, 26, 0.9)';
        modal.style.backdropFilter = 'blur(20px)';
        
        modal.innerHTML = `
            <div class="relative max-w-4xl w-full">
                <button class="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors" onclick="this.closest('.fixed').remove()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <img src="${wallpaper.source}" alt="${wallpaper.title}" class="w-full h-auto rounded-lg">
                <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent rounded-b-lg">
                    <h3 class="text-2xl font-bold text-white mb-2">${wallpaper.title}</h3>
                    <p class="text-gray-300 mb-4">${wallpaper.description}</p>
                    <div class="flex gap-3">
                        <button class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onclick="window.location.href='customize.html?id=${wallpaper.id}'">Customize</button>
                        <button class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" onclick="window.wallpaperStudio.downloadWallpaper(window.wallpaperStudio.wallpapers.find(w => w.id === '${wallpaper.id}'))">Download</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Animate modal in
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
    }

    customizeWallpaper(wallpaper) {
        // Redirect to customization page with wallpaper ID
        window.location.href = `customize.html?id=${wallpaper.id}`;
    }

    downloadWallpaper(wallpaper) {
        // Create a temporary link to download the wallpaper
        const link = document.createElement('a');
        link.href = wallpaper.source;
        link.download = `${wallpaper.title.replace(/\s+/g, '_')}_wallpaper.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success notification
        this.showNotification('Wallpaper downloaded successfully!', 'success');
    }

    handleCollectionClick(collection) {
        // Filter wallpapers based on collection
        const collectionMap = {
            'serene-nature': 'nature',
            'abstract-flows': 'abstract',
            'geometric-patterns': 'geometric',
            'dark-aesthetic': 'dark',
            'biophilic-design': 'biophilic'
        };

        const category = collectionMap[collection];
        if (category) {
            this.handleCategoryFilter(category);
            this.updateActiveTab(document.querySelector(`[data-category="${category}"]`));
            
            // Scroll to gallery
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        }
    }

    animateCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    
                    anime({
                        targets: counter,
                        innerHTML: [0, target],
                        duration: 2000,
                        round: 1,
                        easing: 'easeOutExpo'
                    });
                    
                    observer.unobserve(counter);
                }
            });
        });

        document.querySelectorAll('.stat-number').forEach(counter => {
            observer.observe(counter);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        } text-white`;
        
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="flex-1">${message}</div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });

        // Auto remove after 3 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: 300,
                opacity: 0,
                duration: 300,
                easing: 'easeInQuart',
                complete: () => notification.remove()
            });
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wallpaperStudio = new WallpaperStudio();
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        anime.running.forEach(animation => animation.pause());
    } else {
        // Resume animations when page becomes visible
        anime.running.forEach(animation => animation.play());
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Recalculate layouts if needed
        if (window.wallpaperStudio) {
            window.wallpaperStudio.renderWallpapers();
        }
    }, 250);
});
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about-stats');
    
    function animateStats() {
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (sectionPos < screenPos) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const speed = 200;
                const count = parseInt(stat.textContent);
                const increment = target / speed;
                
                if (count < target) {
                    stat.textContent = Math.ceil(count + increment);
                    setTimeout(animateStats, 1);
                } else {
                    stat.textContent = target;
                }
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Trigger animation when skills section is in view
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
    
    // Projects filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Sample projects data
    const projects = [
        {
            title: "Website Thương Mại Điện Tử",
            description: "Một trang web thương mại điện tử đầy đủ tính năng với hệ thống thanh toán trực tuyến.",
            image: "https://via.placeholder.com/600x400?text=E-commerce",
            tags: ["HTML/CSS", "JavaScript", "React", "Node.js"],
            category: "web",
            demo: "#",
            code: "#"
        },
        {
            title: "Ứng dụng Quản lý Công việc",
            description: "Ứng dụng giúp quản lý công việc hàng ngày với tính năng nhắc nhở và phân loại.",
            image: "https://via.placeholder.com/600x400?text=Task+Manager",
            tags: ["React Native", "Firebase"],
            category: "app",
            demo: "#",
            code: "#"
        },
        {
            title: "Thiết kế Giao diện Người dùng",
            description: "Bộ thiết kế UI/UX cho ứng dụng ngân hàng di động với trải nghiệm người dùng tối ưu.",
            image: "https://via.placeholder.com/600x400?text=UI+Design",
            tags: ["Figma", "Adobe XD", "UI/UX"],
            category: "design",
            demo: "#",
            code: "#"
        },
        {
            title: "Hệ thống Quản lý Kho",
            description: "Phần mềm quản lý kho hàng với tính năng theo dõi tồn kho và báo cáo tự động.",
            image: "https://via.placeholder.com/600x400?text=Inventory",
            tags: ["Python", "Django", "PostgreSQL"],
            category: "web",
            demo: "#",
            code: "#"
        },
        {
            title: "PojavLauncher Patch (iOS)",
            description: "PojavLauncher Patch dành cho iOS, giúp người chơi Minecraft: Java Edition có thể dùng tài khoản nội bộ chơi mà không cần tài khoản đã mua Minecraft.",
            image: "images/PojavLauncher-Patch.png",
            tags: ["JavaScript", "API", "CSS"],
            category: "app",
            demo: "#",
            code: "#"
        },
        {
            title: "Logo và Nhận diện Thương hiệu",
            description: "Thiết kế bộ nhận diện thương hiệu bao gồm logo, màu sắc và phong cách chữ.",
            image: "https://via.placeholder.com/600x400?text=Branding",
            tags: ["Illustrator", "Branding"],
            category: "design",
            demo: "#",
            code: "#"
        }
    ];
    
    // Render projects
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demo}" target="_blank"><i class="fas fa-eye"></i> Demo</a>
                    <a href="${project.code}" target="_blank"><i class="fab fa-github"></i> Code</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
});
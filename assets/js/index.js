// Init Animate On Scroll (Refresh on load to fix hidden elements)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    anchorPlacement: 'top-bottom'
});

// Snap Scroll & Dot Navigation Logic
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');

function scrollToSection(index) {
    const target = document.getElementById(`section-${index}`);
    if(target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// Highlight active dot based on scroll position (Window Scroll)
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Check if section is mainly visible
        if (window.scrollY >= (sectionTop - sectionHeight / 2)) {
            current = index;
        }
    });

    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[current]) dots[current].classList.add('active');
});

// Preserve current section when switching language
function switchLang(targetPage) {
    let current = 0;
    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const h = section.clientHeight;
        if (window.scrollY >= (top - h / 2)) current = index;
    });
    // Navigate to target page with fragment pointing to the same section
    window.location.href = targetPage + '#section-' + current;
}
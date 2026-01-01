// Preserve scroll ratio when switching resumes
function switchResumeLang(targetPage) {
    const doc = document.documentElement;
    const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
    const ratio = window.scrollY / max;
    window.location.href = targetPage + '#pos=' + ratio.toFixed(4);
}

// On load, restore scroll position if pos parameter exists
window.addEventListener('load', () => {
    const m = location.hash.match(/pos=(\d*\.?\d+)/);
    if (m) {
        const ratio = parseFloat(m[1]);
        if (!isNaN(ratio)) {
            const doc = document.documentElement;
            const max = Math.max(doc.scrollHeight - window.innerHeight, 0);
            window.scrollTo(0, Math.round(ratio * max));
        }
    }
});
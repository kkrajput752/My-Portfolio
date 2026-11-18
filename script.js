
const typing = document.getElementById('typing');

const roles = [
    'AI/ML Enthusiast',
    'Computer Science Student',
    'Python Developer',
    'Problem Solver'
];

let r = 0;
let c = 0;
let deleting = false;

function type() {

    let current = roles[r];

    typing.textContent = current.slice(
        0,
        c + (deleting ? -1 : 1)
    );

    c += deleting ? -1 : 1;

    if (!deleting && c === current.length) {
        deleting = true;
        setTimeout(type, 1300);
        return;
    }

    if (deleting && c === 0) {
        deleting = false;
        r = (r + 1) % roles.length;
        setTimeout(type, 350);
        return;
    }

    setTimeout(type, deleting ? 45 : 95);
}

type();

/* MOBILE MENU */

const menu = document.getElementById('menuBtn');
const links = document.getElementById('navLinks');

menu.addEventListener('click', () => {

    links.classList.toggle('active');

    menu.textContent =
        links.classList.contains('active') ? '✕' : '☰';

});

links.querySelectorAll('a').forEach(a => {

    a.addEventListener('click', () => {
        links.classList.remove('active');
        menu.textContent = '☰';
    });

});

/* COPYRIGHT YEAR */

document.getElementById('year').textContent =
    new Date().getFullYear();

/* SCROLL REVEAL */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

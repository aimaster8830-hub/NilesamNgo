// ===================================
// 1. SMOOTH SCROLLING
// ===================================

document.querySelectorAll('nav a, .btn').forEach(function(link) {

    link.addEventListener('click', function(event) {

        const targetId = this.getAttribute('href');

        // Check whether the link points to a section
        if (targetId && targetId.startsWith('#')) {

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

    });

});


// ===================================
// 2. UPDATE COPYRIGHT YEAR
// ===================================

const yearElement = document.getElementById('year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ===================================
// 3. NAVIGATION ACTIVE LINK
// ===================================

const sections = document.querySelectorAll(
    'main section[id]'
);

const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            navLinks.forEach(function(link) {

                link.classList.remove('active');

                if (
                    link.getAttribute('href') ===
                    '#' + entry.target.id
                ) {
                    link.classList.add('active');
                }

            });

        }

    });

}, {
    threshold: 0.3
});

sections.forEach(function(section) {
    observer.observe(section);
});


// ===================================
// 4. WELCOME MESSAGE
// ===================================

console.log("Welcome to Nilesam NGO Website!");


// ===================================
// 5. IMAGE ERROR HANDLING
// ===================================

document.querySelectorAll('img').forEach(function(image) {

    image.addEventListener('error', function() {

        console.log("Image could not be loaded: " + image.src);

    });

});


// 1. Find the elements we want to control
const buttons = document.querySelectorAll('#amounts button');
const giveButton = document.getElementById('give');

// 2. Remember the chosen amount
let amount = 1000;

// 3. A function that updates the page
function update() {
  giveButton.textContent = 'Give Rs ' + amount;
  buttons.forEach(function (b) {
    b.classList.toggle('active', Number(b.dataset.amount) === amount);
  });
}

// 4. React to clicks
buttons.forEach(function (b) {
  b.addEventListener('click', function () {
    amount = Number(b.dataset.amount);
    update();
  });
});

// 5. Run once at the start
update();
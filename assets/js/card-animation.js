const overlay = document.querySelector('.choice-overlay');
const cards = document.querySelectorAll('.version-card');

// if (overlay) {
//     const chosenVersion = sessionStorage.getItem('chosenWebsiteVersion');

//     if (chosenVersion) {
//         overlay.classList.add('is-hidden');
//     }
// }

const savedChoice = sessionStorage.getItem('chosenWebsiteVersion');

if (savedChoice) {
    overlay?.classList.add('is-hidden');
}


cards.forEach(card => {
    card.addEventListener('click', function (event) {
        const version = this.dataset.version || 'clean-readability';
        sessionStorage.setItem('chosenWebsiteVersion', version);

        if (overlay) {
            overlay.classList.add('is-closing');
        }
    });
});

const galleries = document.querySelectorAll(".gallery");

galleries.forEach((gallery) => {
    const track = gallery.querySelector(".gallery-track");
    const previousButton = gallery.querySelector(".gallery-arrow--left");
    const nextButton = gallery.querySelector(".gallery-arrow--right");

    if (!track || !previousButton || !nextButton) {
        return;
    }

    const getScrollDistance = () => {
        const card = track.querySelector(".project-card");

        if (!card) {
            return track.clientWidth;
        }

        return card.getBoundingClientRect().width + 24;
    };

    previousButton.addEventListener("click", () => {
        track.scrollBy({
            left: -getScrollDistance(),
            behavior: "smooth"
        });
    });

    nextButton.addEventListener("click", () => {
        track.scrollBy({
            left: getScrollDistance(),
            behavior: "smooth"
        });
    });
});
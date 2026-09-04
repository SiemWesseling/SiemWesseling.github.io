const aboutGallery = document.querySelector(".about-photo-gallery");

if (aboutGallery) {
    const photos = aboutGallery.querySelectorAll(".about-photo");
    const previousButton = aboutGallery.querySelector(".about-photo-arrow--left");
    const nextButton = aboutGallery.querySelector(".about-photo-arrow--right");

    let currentPhotoIndex = 0;
    let photoTimer;

    const showPhoto = (photoIndex) => {
        photos[currentPhotoIndex].classList.remove("is-active");

        currentPhotoIndex = (photoIndex + photos.length) % photos.length;

        photos[currentPhotoIndex].classList.add("is-active");
    };

    const showNextPhoto = () => {
        showPhoto(currentPhotoIndex + 1);
    };

    const showPreviousPhoto = () => {
        showPhoto(currentPhotoIndex - 1);
    };

    const restartPhotoTimer = () => {
        window.clearInterval(photoTimer);

        photoTimer = window.setInterval(() => {
            showNextPhoto();
        }, 5000);
    };

    nextButton.addEventListener("click", () => {
        showNextPhoto();
        restartPhotoTimer();
    });

    previousButton.addEventListener("click", () => {
        showPreviousPhoto();
        restartPhotoTimer();
    });

    restartPhotoTimer();
}
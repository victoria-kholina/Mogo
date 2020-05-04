let carouselBodies = document.getElementsByClassName("carousel-body");

let touchStart,
    touchEnd,
    slidePos;

for (let carouselBody of carouselBodies) {
    let arrowPrev = carouselBody.closest(".carousel").querySelector(".arrow-prev");
    let arrowNext = carouselBody.closest(".carousel").querySelector(".arrow-next");
    let carouselWidth = carouselBody.scrollWidth;
    let startSlide = carouselBody.firstElementChild;
    startSlide.classList.add("active");
    carouselBody.insertAdjacentElement("afterbegin", carouselBody.lastElementChild);
    slidePos = startSlide.offsetLeft;
    carouselBody.scrollLeft = slidePos;

    arrowNext.onclick = function (event) {
       scrollCarousel(carouselBody, carouselWidth,  "next");
    }

    arrowPrev.onclick = function (event) {
        scrollCarousel(carouselBody, carouselWidth, "prev")
    }

    carouselBody.ontouchstart = function(event) {
        event.preventDefault();
        touchStart = event.touches[0].clientX;
    }
    carouselBody.ontouchend = function(event) {
        touchEnd = event.changedTouches[0].clientX;
        touchEnd < touchStart ? scrollCarousel(this, "next") :
            scrollCarousel(this, "prev")
    }
    document.body.onresize = function(event) {
        carouselBody.scrollLeft = carouselBody.querySelector(".active").offsetLeft;
    }
}

function scrollCarousel(carousel, width,  direction) {
    let currSlide = carousel.querySelector(".active"),
         firstSlide= carousel.firstElementChild,
         lastSlide = carousel.lastElementChild;

    if(direction === "next") {
        firstSlide.style.transform = `translate(${width}px)`;
        slidePos += currSlide.offsetWidth;
        currSlide.classList.remove("active");

        // scrollToPosition(carousel, slidePos).then(res=> {
        //     let newLastSlide = carousel.insertAdjacentElement("beforeend", firstSlide);
        //     newLastSlide.style.removeProperty('transform');
        //     newLastSlide.classList.add("active");
        // });
    } else {

    }
}

async function scrollToPosition(container, position) {
    if (container.scrollLeft === position) return false;

    let resolveFunc,
        scrollListener,
        timeOutId;

    const promise = new Promise(resolve => resolveFunc = resolve );

    const finished = () => {
        container.removeEventListener('scroll', scrollListener);
        resolveFunc();
    };

    scrollListener = () => {
        clearTimeout(timeOutId);
        container.scrollLeft === position ? finished() : timeOutId = setTimeout(finished, 100)
    };

    container.addEventListener('scroll', scrollListener);

    container.scrollTo({
        left: position,
        behavior: 'smooth',
    });

    return promise;
}
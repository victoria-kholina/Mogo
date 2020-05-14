const carousels= document.getElementsByClassName("carousel");

for(let carousel of carousels) {
    let carouselTrack = carousel.querySelector(".carousel-track"),
        prev = carousel.querySelector(".arrow-prev"),
        next = carousel.querySelector(".arrow-next");
        slideCarousel(carousel, carouselTrack, prev, next);
}

function slideCarousel( wrapper, track, prev, next ) {
    const   slides = track.getElementsByClassName("carousel-item"),
                slidesLength = slides.length,
                firstSlide = track.firstElementChild,
                lastSlide = track.lastElementChild,
                cloneFirst = firstSlide.cloneNode(true),
                cloneLast = lastSlide.cloneNode(true),
                threshold = 100;

    firstSlide.classList.add("active");
    track.appendChild(cloneFirst);
    track.insertBefore(cloneLast, firstSlide);
    track.style.left = -( firstSlide.offsetLeft ) + "px";

    let    posXFirst = 0,
            posXSecond = 0,
            startPos,
            finalPos,
            index = 0,
            allowShift = true,
            slideSize = firstSlide.offsetWidth;

    //Events
    track.onmousedown = dragStart;
    track.ontouchstart = dragStart;

    track.ontouchend = dragEnd;

    track.ontouchmove = dragAction;

    prev.onclick = () =>  changeSlide(-1)
    next.onclick = () =>  changeSlide(1)

    track.ontransitionend = checkIndex;

    const observer= new ResizeObserver(entry => {
        track.style.left = -(track.querySelector(".active").offsetLeft) + "px";
        slideSize = firstSlide.offsetWidth;
    });

    observer.observe(wrapper);

    function dragStart(event) {
        event || window.event;
        event.preventDefault();
        startPos = track.offsetLeft;

        if(event.type == "touchstart") {
            posXFirst = event.touches[0].clientX;
        } else {
            posXFirst = event.clientX;
            track.onmouseup = dragEnd;
            track.onmousemove = dragAction;
        }
    }

    function dragAction(event) {
        event || window.event;
        if ( event.type == "touchmove" ) {
            posXSecond = posXFirst - event.touches[0].clientX;
            posXFirst = event.touches[0].clientX;
        } else {
            posXSecond = posXFirst - event.clientX;
            posXFirst = event.clientX
        }
        track.style.left = (track.offsetLeft - posXSecond) + "px"
    }

    function dragEnd(event) {
        finalPos = track.offsetLeft;
        startPos - finalPos > -threshold   ?
            changeSlide(1, "drag") :
            startPos - finalPos < threshold  ?
                changeSlide(-1, "drag") :
                    track.style.left = ( startPos ) + "px";

        track.onmouseup = null;
        track.onmousemove = null;
    }

    function changeSlide( direction, action ) {
        for ( let i=0; i<slides.length; i++) {
            if(slides[i].classList.contains("active")) {
                slides[i].classList.remove("active")
            }
        }
        track.classList.add("transition");
            if( allowShift ) {
                if( !action )  startPos = track.offsetLeft ;

                if( direction == 1 ) {
                    track.style.left = ( startPos - slideSize ) + "px";
                    index++;
                } else {
                    track.style.left = ( startPos + slideSize  ) + "px";
                    index--;

                }
            }

            allowShift = false;
    }

    function checkIndex() {
        track.classList.remove("transition");

        if( index == -1 ) {
            track.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }
        if ( index == slidesLength ) {
            track.style.left = -( slideSize) + "px"
            index = 0;
        }
        slides[index+1].classList.add("active");
        allowShift = true;
    }
}


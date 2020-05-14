if (window.innerWidth < 767) {
    document.getElementById("mobile-menu-icon").onclick =  function () {
        let menuMobile = document.getElementById("menu");
        menuMobile.classList.contains("show-from-right") ?
             toggleClasses(menuMobile, "show-from-right", "hide-to-right" ) :
             toggleClasses(menuMobile, "hide-to-right", "show-from-right" )
    }
}
for(let icon of document.getElementsByClassName("search-icon")) {
    icon.onclick = function() {
        let input = icon.closest(".search").querySelector(".search-input")
        input.classList.contains("open-search") ?
            toggleClasses(input, "open-search", "close-search" ) :
            toggleClasses(input, "close-search", "open-search" )
    }
}
for(let elem of document.getElementsByClassName("accordion__btn")) {
    elem.onclick = function (event) {
        let accordionText = event.target.nextElementSibling;
        let accordionParentClass = event.target.closest(".accordion").classList;
        if ( accordionParentClass.contains("active") ) {
            accordionParentClass.remove("active");
            toggleClasses(accordionText, "open-accordion", "close-accordion" )
        } else {
            accordionParentClass.add("active");
            toggleClasses(accordionText, "close-accordion", "open-accordion" )
        }
    }
}

function toggleClasses (elem, classToRemove, classToAdd) {
    elem.classList.remove(classToRemove)
    elem.classList.add(classToAdd)
}
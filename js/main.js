if (window.innerWidth < 767) {
    document.getElementById("mobile-menu-icon").onclick =  function (event) {
        let menuMobile = document.getElementById("menu");
        menuMobile.classList.contains("show-from-right") ?
             switchClasses(menuMobile, "show-from-right", "hide-to-right" ) :
             switchClasses(menuMobile, "hide-to-right", "show-from-right" )
    }
}

for(let elem of document.getElementsByClassName("accordion__btn")) {
    elem.onclick = function (event) {
        let accordionText = event.target.nextElementSibling;
        let accordionParentClass = event.target.closest(".accordion").classList;
        if ( accordionParentClass.contains("active") ) {
            accordionParentClass.remove("active");
            switchClasses(accordionText, "open-accordion", "close-accordion" )
        } else {
            accordionParentClass.add("active");
            switchClasses(accordionText, "close-accordion", "open-accordion" )
        }
    }
}

function switchClasses (elem, classToRemove, classToAdd) {
    elem.classList.remove(classToRemove)
    elem.classList.add(classToAdd)
}
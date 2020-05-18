if (window.innerWidth < 767) {
    document.getElementById("mobile-menu-icon").onclick =  function () {
        let menuMobile = document.getElementById("menu");
        let svgIdElem= this.getElementsByTagName("use")[0];
        if(menuMobile.classList.contains("show-from-right") ) {
            toggleClasses(menuMobile, "show-from-right", "hide-to-right" );
            svgIdElem.setAttribute("xlink:href", "#menu-mobile");
        } else {
            toggleClasses(menuMobile, "hide-to-right", "show-from-right" )
            svgIdElem.setAttribute("xlink:href", "#menu-close");
        }

    }
}
let welcomeItems = document.getElementsByClassName("menu-item");
for(let item of welcomeItems) {
    item.onclick = function(event) {
        for(let item of welcomeItems) {
            item.classList.remove("active")
        }
        this.classList.add("active");
    }
}
document.getElementById("contacts").onclick = function(event) {
  let map = document.getElementById("map");
  map.classList.contains("open-map") ?
      toggleClasses(map, "open-map", "close-map" ) :
      toggleClasses(map, "open-map", "open-map" )
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

function zoomClickFunc() {
    let intv = 4;
    let anim = null;
    let ratio = 0.
    let thisId = this.id.split('-').at(-1);
    let zoomBoxContent = document.getElementById("zoom-box-content-" + thisId);
    if (zoomBoxContent.style.opacity === '0') {
        zoomBoxContent.style.opacity = '1';
        ratio = 0;
        clearInterval(anim);
        anim = setInterval(() => {
            if (ratio >= 100) {
                clearInterval(anim);
            }
            else {
                ratio += intv;
                ratio = ratio > 100 ? 100 : ratio;
                zoomBoxContent.style.width = ratio.toString() + '%';
            }
        }, 5);
        this.innerHTML = "<i class='fas fa-search-minus'></i>";
    } else {
        ratio = 100;
        clearInterval(anim);
        anim = setInterval(() => {
            if (ratio <= 0) {
                clearInterval(anim);
                zoomBoxContent.style.opacity = '0';
            }
            else {
                ratio -= intv;
                ratio = ratio < 0 ? 0 : ratio;
                zoomBoxContent.style.width = ratio.toString() + '%';
            }
        }, 5);
        this.innerHTML = "<i class='fas fa-search-plus'></i>";
    }
}

function bibClickFunc () {
    let thisId = this.id.split('-').at(-1);
    let bibBoxContent = document.getElementById("bib-box-content-" + thisId);
    if (bibBoxContent.style.display === 'none') {
        fetch('bibs/' + thisId + '.txt')
            .then(response => response.text())
            .then((data) => {
                bibBoxContent.innerHTML = String(data);
            })
        bibBoxContent.style.display = 'block';
    } else {
        bibBoxContent.style.display = 'none';
    }
}

window.onload = () => {
    let zoomBtns = document.getElementsByClassName('zoom');
    let bibBtns = document.getElementsByClassName('bibClick');

    // add a click function for each zoom button
    for (zoomBtn of zoomBtns)
        zoomBtn.onclick = zoomClickFunc;

    // add a click function for each bibtex
    for (bibBtn of bibBtns)
        bibBtn.onclick = bibClickFunc;
}

let mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

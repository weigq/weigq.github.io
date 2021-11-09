
function zoomClickFunc() {
    let thisId = this.id.split('-').at(-1);
    let zoomBoxContent = $("#zoom-box-content-" + thisId);
    if (zoomBoxContent.css('opacity') === '0') {
        $("#zoom-box-content-" + thisId).animate({'width': '100%', 'opacity': '1'}, 300);
        $(this).html("<i class='fas fa-search-minus'></i>");
    } else {
        $("#zoom-box-content-" + thisId).animate({'width': '0', 'opacity': '0'}, 300);
        $(this).html("<i class='fas fa-search-plus'></i>");
    }
}

function bibClickFunc () {
    let thisId = this.id.split('-').at(-1);
    let bibBoxContent = $("#bib-box-content-" + thisId);
    if (bibBoxContent.css('display') === 'none') {
        fetch('bibs/' + thisId + '.txt')
            .then(response => response.text())
            .then((data) => {
                $("#bib-box-content-" + thisId).html(String(data));
            })
        $("#bib-box-content-" + thisId).slideToggle(300);
    } else {
        $("#bib-box-content-" + thisId).slideToggle(300);
    }
}

function fillBib (el) {
    let thisId = el.id.split('-').at(-1);
    let bibBoxContent = $("#bib-box-content-" + thisId);
    fetch('bibs/' + thisId + '.txt')
        .then(response => response.text())
        .then((data) => {
            bibBoxContent.html(String(data));
        })
}

window.onload = () => {
    let zoomBtns = $(".zoom");
    let bibBtns = $(".bibClick");

    // add a click function for each zoom button
    for (zoomBtn of zoomBtns)
        zoomBtn.onclick = zoomClickFunc;

    for (let i = 0; i < bibBtns.length; i++) {
        bibBtn = bibBtns[i];
        fillBib(bibBtn);
        bibBtn.onclick = bibClickFunc;
    }
}

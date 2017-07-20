/**
 * Created by TRKaradOl on 19.07.2017.
 */

$(function () {

    // ---- Main Page ---- //
    $('#search-button').on("click", function (e) {
        var query = $('#search-query').val().replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
        if (query !== "") {
            window.location = "/search?q=" + query + "&s=title&o=1";
        }
    });

    $('#view-all-button').on("click", function (e) {
        window.location = "/search?s=title&o=1";
    });

    $(document).keydown(function (e) {
        if (e.keyCode == '13') {
            $('#search-button').click();
        }
    });

    // ---- Search Result Page ----- //
    $('.clickable-row').click(function (e) {
        window.location = "/library/?isbn=" + $(this).attr("id");
    });

    $('#results-table').find('thead tr th').each(function () {
        setHrefs($(this).find('a').attr('id'));
    });

    // ---- Get Book Page ---- //
    $('#update-button').on("click", function (e) {
        var query = $(this).data("isbn") + "".replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
        if (query !== "") {
            window.location = "/library/update?isbn=" + query;
        }
    });

    $('#delete-button').on("click", function (e) {
        $.ajax({
            url: '/library/?isbn=' + $(this).data("isbn"),
            type: 'DELETE',
            success: function (result) {
                window.location = "/search?s=title&o=1";
            }
        });
    });

    // ---- Add & Update Pages ---- //
    $('#add-update-button').on("click", function (e) {
        e.preventDefault();
        let authors = [];
        if($('#authors').val().indexOf(',') > -1){
            $('#authors').val().split().forEach(function (item) {
                authors.push(item);
            })
        }
        else authors.push($('#authors').val());
        let data = {
            "_id": $('#_id').val(),
            "cat": $('#cat').val(),
            "title": $('#title').val(),
            "authors": $('#authors').val().split(),
            "inStock": $('#inStock').is(":checked"),
            "price": $('#price').val(),
            "pages_i": $('#pages_i').val(),
            "publisher": $('#publisher').val()

        };
        $.ajax({
            type: 'PUT',
            url: '/library/',
            data: JSON.stringify(data),
            success: function (data) {
                window.location = "/search?s=title&o=1";
            },
            contentType: "application/json",
            dataType: 'json'
        });
    });
});
function setHrefs(id) {
    let link = $('#' + id);
    var href = window.location.href.split("?")[0] + "?";
    if (getParameterByName("q")) {
        href += "q=" + getParameterByName("q") + "&";
    }
    href += "s=" + id;
    let order = parseInt(getParameterByName("o"));
    if (getParameterByName("s") === id) {
        order *= -1;
    }
    href += "&o=" + order;
    link.attr("href", href);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
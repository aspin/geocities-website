$(document).ready(function() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        window.location.href = 'https://www.google.com/#q=' + event.target.query.value;
    });
})
var GB = new Firebase('https://geocity.firebaseIO.com/guestbook/');
GB.limitToLast(10);

$(document).ready(function() {
    $('#google').on('submit', function(event) {
        event.preventDefault();
        window.location.href = 'https://www.google.com/#q=' + event.target.query.value;
    });

    $('#guestNote').on('submit', function(event) {
        event.preventDefault();

        var now = new Date();
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var formattedDate = months[now.getMonth()] + ' ' + now.getDate() + ", " + now.getFullYear();

        var note = {
            name: $('#name').val(),
            date: formattedDate,
            realdate: new Date().getTime(),
            message: event.currentTarget.message.value
        };

        GB.push(note);
        event.target.reset();
    })


});

angular.module('GeocityApp', [])
    .controller('GuestbookController', function ($scope) {
        var guestbook = this;
        guestbook.entries = [];
        GB.on('value', function(snapshot) {
            var temp = [];
            snapshot.forEach(function(ss) {
                temp.unshift(ss.val());
            });
            guestbook.entries = temp;
            $scope.$apply();

        }, function(err) {
            alert(err.code);
        });
    });

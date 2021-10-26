/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo-url');
var $image = document.querySelector('.image');

function handlePhotoUrl(event) {
  var imageUrl = event.target.value;
  $image.setAttribute('src', imageUrl);
}

$photoUrl.addEventListener('input', handlePhotoUrl);

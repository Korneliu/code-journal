/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo-url');
var $image = document.querySelector('.image');
var $form = document.querySelector('#form');

function handlePhotoUrl(event) {
  var imageUrl = event.target.value;
  $image.setAttribute('src', imageUrl);
}

$photoUrl.addEventListener('input', handlePhotoUrl);

function handleForm(event) {
  event.preventDefault();
  var inputObject = {};

  inputObject.title = event.target.title.value;
  inputObject.photo = event.target.photo.value;
  inputObject.notes = event.target.notes.value;
  data.nextEntryId++;
  inputObject.entryId = data.nextEntryId;
  data.entries.unshift(inputObject);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', handleForm);

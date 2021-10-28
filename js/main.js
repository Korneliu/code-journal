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

function renderEntry(entry) {

  var liElement = document.createElement('li');

  var mainRow = document.createElement('div');
  mainRow.setAttribute('class', 'row');
  liElement.appendChild(mainRow);

  var entryImage = document.createElement('img');
  entryImage.setAttribute('class', 'column-full column-half');
  entryImage.setAttribute('src', entry.photo);
  mainRow.appendChild(entryImage);

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');
  mainRow.appendChild(columnHalf);

  var entryTitle = document.createElement('h2');
  entryTitle.textContent = entry.title;
  columnHalf.appendChild(entryTitle);

  var note = document.createElement('p');
  note.textContent = entry.notes;
  columnHalf.appendChild(note);

  return liElement;
}

var list = document.querySelector('#list');

window.addEventListener('DOMContentLoaded', event => {

  for (var i = 0; i < data.entries.length; i++) {
    var result = renderEntry(data.entries[i]);
    list.appendChild(result);
  }
});

var $viewList = document.querySelector('.view');

function handleView(event) {
  event.preventDefault();

  if (event.target.matches('.view')) {
    for (var i = 0; i < $viewList.length; i++) {
      if ($viewList === event.target) {
        $viewList[i].className = 'hidden';
      } else {
        $viewList[i].className = 'view';
      }
    }
  }
}

document.querySelector('.view').addEventListener('click', handleView);

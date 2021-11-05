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
  var newEntry = renderEntry(inputObject);
  var ulList = document.querySelector('ul');
  ulList.prepend(newEntry);
  $form.reset();
  switchingViews('entry-form');

}

$form.addEventListener('submit', handleForm);

function renderEntry(entry) {
  var liElement = document.createElement('li');
  liElement.setAttribute('data-entry', entry.entryId);

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

  var penIcon = document.createElement('i');
  penIcon.className = 'fas fa-pencil-alt';
  entryTitle.appendChild(penIcon);

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
  switchingViews(data.view);
});

function switchingViews(viewName) {
  var $viewList = document.querySelectorAll('.view');
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') === viewName) {
      $viewList[i].className = 'view hidden';
    } else {
      $viewList[i].className = 'view';
    }
  }
  data.view = viewName;
}

function handleViews(event) {
  event.preventDefault();
  var eventAttribute = event.target.getAttribute('data-view');
  switchingViews(eventAttribute);
}

function handleEdit(event) {
  event.preventDefault();
  var entryAttribute = parseInt(event.target.closest('li').getAttribute('data-entry'));
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryAttribute) {
      data.editing = data.entries[i];
    }
  }
}

document.querySelector('ul').addEventListener('click', handleEdit);
document.querySelector('.view-selector-entries').addEventListener('click', handleViews);
document.querySelector('.view-selector-new').addEventListener('click', handleViews);

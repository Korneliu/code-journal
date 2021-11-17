/* global data */
/* exported data */

var $photoUrl = document.querySelector('#photo-url');
var $image = document.querySelector('.image');
var $form = document.querySelector('#form');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var list = document.querySelector('#list');
var $rowHeader = document.querySelector('.row-header');
var $deleteButton = document.querySelector('.delete-button-visible');
var $confirmationModal = document.querySelector('.confirmation-modal-invisible');

function handlePhotoUrl(event) {
  var imageUrl = event.target.value;
  $image.setAttribute('src', imageUrl);
}

$photoUrl.addEventListener('input', handlePhotoUrl);

function handleForm(event) {
  event.preventDefault();
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].title = event.target.title.value;
        data.entries[i].photo = event.target.photo.value;
        data.entries[i].notes = event.target.notes.value;
        var editedObject = data.entries[i];
        var renderedObject = document.querySelectorAll('li');
        for (var j = 0; j < renderedObject.length; j++) {
          if (parseInt(renderedObject[j].dataset.entry) === editedObject.entryId) {
            renderedObject[j].replaceWith(renderEntry(editedObject));
          }
        }
      }
      switchingViews('entry-form');
    }
  } if (data.editing === null) {
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
    switchingViews('entry-form');
  }
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  data.editing = null;
}

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
  if (event.target.tagName === 'I') {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entryAttribute) {
        data.editing = data.entries[i];
      }
    }
    $image.setAttribute('src', data.editing.photo);
    $title.value = data.editing.title;
    $photoUrl.value = data.editing.photo;
    $notes.value = data.editing.notes;
    document.querySelector('.delete-button-invisible').setAttribute('class', 'delete-button-visible');
    switchingViews('entries');
  }
}

function handleDeleteEntry(event) {
  event.preventDefault();
  /*   var $confirmationModalBackground = document.createElement('div');
  $confirmationModalBackground.setAttribute('class', 'confirmation-modal-background');
  $rowHeader.appendChild($confirmationModalBackground); */
  $confirmationModal.setAttribute('class', 'confirmation-modal-visible');
}

var $confirmationModalBackground = document.querySelector('.confirmation-modal-background');

function handleCancelButton(event) {
  event.preventDefault();
  $confirmationModal.setAttribute('class', 'confirmation-modal-invisible');
  $confirmationModalBackground.remove();
}

function handleDeleteEntryButton(event) {
  event.preventDefault();
  console.log(data.entries);
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(data.entries.indexOf(data.entries[i]), 1);
      $confirmationModal.setAttribute('class', 'confirmation-modal-invisible');
      // switchingViews('entries');
    }
  }
}

document.querySelector('ul').addEventListener('click', handleEdit);
document.querySelector('.view-selector-entries').addEventListener('click', handleViews);
document.querySelector('.view-selector-new').addEventListener('click', handleViews);
$form.addEventListener('submit', handleForm);
document.querySelector('.delete-button-invisible').addEventListener('click', handleDeleteEntry);
document.querySelector('.cancel-button').addEventListener('click', handleCancelButton);
document.querySelector('.confirm-button').addEventListener('click', handleDeleteEntryButton);

/* exported data */

var data = {
  view: 'entries',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJson = localStorage.getItem('code-journal-local-storage');
if (previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}

function handleBeforUnload() {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleBeforUnload);

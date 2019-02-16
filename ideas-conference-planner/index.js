const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const main = remote.require('./main.js');
var hilighted = false;

function getAttendeeName(attendee) {
  return attendee == null ? "" : (attendee.prefix == null ? "" : attendee.prefix) + ' ' + attendee.first + ' ' + attendee.last;
}

function ratePresentation() {
  var button = document.createElement('button');
  button.textContent = 'Rate Presentation';
  button.addEventListener('click', () => {
    var window = remote.getCurrentWindow();
    main.openWindow('index-rating');
    window.close();
  }, false)
  document.body.appendChild(button);
}

function generateTable(data) {
  var presentationDiv = document.getElementById('presentationDiv');
  var table = document.createElement('table');
  table.setAttribute('border','1');
  table.setAttribute('width','100%');
  var numRows = data.length;
  var row = table.insertRow(0);

  var th = document.createElement('th');
  th.appendChild(document.createTextNode('Date'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Title'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Description'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Objective 1'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Objective 2'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Objective 3'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Presenter'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Co-Presenter 1'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Co-Presenter 2'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Co-Presenter 3'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Rating 1'));
  row.appendChild(th);

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Rating 2'));
  row.appendChild(th);

  for (i = 0; i < numRows; ++i) {
    var row = table.insertRow(i + 1);
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(data[i].submission_date.slice(0, 10)));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(data[i].title));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(data[i].description));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(data[i].objective_1));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(data[i].objective_2));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(data[i].objective_3));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(getAttendeeName(data[i].Presenter)));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(getAttendeeName(data[i].Copresenter1)));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(getAttendeeName(data[i].Copresenter2)));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(getAttendeeName(data[i].Copresenter3)));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(getAttendeeName(data[i].Rating1)));
    row.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(getAttendeeName(data[i].Rating2)));
    row.appendChild(td);

    row.onclick= function () {
      if(!this.hilite && !hilighted){
        this.origColor=this.style.backgroundColor;
        this.style.backgroundColor='#BCD4EC';
        this.hilite = true;
        hilighted = true;
        ratePresentation();
      } else {
        this.style.backgroundColor=this.origColor;
        this.hilite = false;
        hilighted = false;
      }
    }
  }

  presentationDiv.innerHTML = '';
  presentationDiv.appendChild(table);
}

function refreshPresentations() {
  ipc.send('query-presentations', '');
}

document.addEventListener('DOMContentLoaded', refreshPresentations);

document.getElementById("getjotfile").addEventListener("change", ingestCSV);

function ingestCSV() {
  var jotfile = document.getElementById("getjotfile");
  ipc.send('ingest-csv', jotfile.files[0].path);
}

ipc.on('ingest-csv', function(event, arg) {
  alert(arg);
});

ipc.on('query-presentations-reply', function(event, arg) {
  var query = JSON.parse(arg);
  generateTable(query);
});
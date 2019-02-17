const ipc = require('electron').ipcRenderer;
var selectedRow;


function getAttendeeName(attendee) {
  return attendee == null ? "" : (attendee.prefix == null ? "" : attendee.prefix) + ' ' + attendee.first + ' ' + attendee.last;
}

function ratePresentation(rowID) {
  var button = document.createElement('button');
  button.textContent = 'Rate';
  var actionSpace = document.getElementById('actions' + rowID);

  button.addEventListener('click', () => {
    window.location = 'index-rating.html'
  }, false);

  actionSpace.appendChild(button);
}

function categorizePresentation(rowID) {

  var button = document.createElement('button');
  button.textContent = 'Categorize';
  

  var actionSpace = document.getElementById('actions' + rowID);

  button.addEventListener('click', () => {
    // stores the raw html data for the row in session storage.
    actionSpace.innerHTML = '';
    sessionStorage.row = document.getElementById(rowID).innerHTML;
    window.location = "categorizer.html";
  }, false)

  actionSpace.appendChild(button);

  
}

function generateTable(data) {
  var presentationDiv = document.getElementById('presentationDiv');
  var table = document.createElement('table');
  table.id = 'PresentationTable';

  table.setAttribute('border','1');
  table.setAttribute('width','100%');
  var numRows = data.length;
  var row = table.insertRow(0);



  var th = document.createElement('th');
  th.appendChild(document.createTextNode('Actions'));
  row.appendChild(th);

  th = document.createElement('th');
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

  th = document.createElement('th');
  th.appendChild(document.createTextNode('Category'));
  row.appendChild(th);

  for (i = 0; i < numRows; ++i) {
    var row = table.insertRow(i + 1);
    row.id =  i;

    var td = document.createElement('td');
    td.id = 'actions' + i;
    td.appendChild(document.createTextNode(''));
    row.appendChild(td);


    td = document.createElement('td');
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


    

    // td = document.createElement('td');
    // td.appendChild(document.createTextNode(data[i].category));
    // row.appendChild(td);

    row.onclick= function () {
     if(!this.hilite){
        var row = this;
        row.style.backgroundColor = this.origColor;
        row.hilite = false;
        ratePresentation(this.id);
        // categorizePresentation(this.id);
        this.origColor=this.style.backgroundColor;
        this.style.backgroundColor='#BCD4EC';
        this.hilite = true;
      }
      else {
        this.style.backgroundColor=this.origColor;
        this.hilite = false;
        var actionSpace = document.getElementById('actions' + this.id);
        actionSpace.innerHTML = '';
      }
    }

    row.ondblclick = function() {
      var pEntry = document.getElementById('pEntry');
      // var date = this.cells[1].text;
      // pEntry.appendChild(date);

      pEntry.innerHTML = '';
      var length = this.cells.length - 1;
      var nextCell = document.createElement('p');
            
      
      nextCell.innerHTML = this.cells[1].innerHTML;
      pEntry.appendChild(nextCell);
      nextCell = document.createElement('p');

      nextCell.innerHTML = this.cells[2].innerHTML;
      pEntry.appendChild(nextCell);
      nextCell = document.createElement('p');

      nextCell.innerHTML = this.cells[3].innerHTML;
      pEntry.appendChild(nextCell);
      nextCell = document.createElement('p');

      nextCell.innerHTML = this.cells[4].innerHTML;
      pEntry.appendChild(nextCell);
      nextCell = document.createElement('p');

      nextCell.innerHTML = this.cells[5].innerHTML;
      pEntry.appendChild(nextCell);
      nextCell = document.createElement('p');

      nextCell.innerHTML = this.cells[6].innerHTML;
      pEntry.appendChild(nextCell);
      nextCell = document.createElement('p');

      

      // pEntry.innerHTML = this.innerHTML;
      var modal = document.getElementById('myModal');
      var span = document.getElementsByClassName("close")[0];


      modal.style.display = "block";
      


      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
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

ipc.on('categorize', function(event, arg) {
  event.returnValue = document.getElementById(rowID);
});


ipc.on('query-presentations-reply', function(event, arg) {
  var query = JSON.parse(arg);
  generateTable(query);
});

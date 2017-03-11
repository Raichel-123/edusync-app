var file, currentIndex=0, packet=1024*1024;

var socket = io(window.location.origin+'/upload');

socket.on('connect', function(data){});

socket.on('ack', function(){
  let progress = parseInt((currentIndex/file.size)*100);
   $('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);
  if(currentIndex==file.size){
    file=null;
    currentIndex=0;
    socket.emit('done');
    $('#myModal').modal('hide');
    $('#row').append('<div class="alert alert-success" role="alert">Video uploaded, please refresh the page</div>')
    return;
  }
  var reader = new FileReader();
  reader.onloadend = function(e){
    if (e.target.readyState != FileReader.DONE)
      return;
    var data = e.target.result;
    socket.emit('data', data);
  };
  var start = currentIndex;
  var end = ((currentIndex+packet)>=file.size)?file.size:(currentIndex+packet);
  var blob = file.slice(start, end);
  currentIndex = end;
  reader.readAsBinaryString(blob);
});

$('#file-selector').change(function(e){
  console.log("file-selector",e.target.files);
  if(e.target.files.length<1)
    return;
  file=e.target.files[0];
  $('#file-name').val(file.name);
  $('#row .alert').remove();
});

$('#upload').click(function(e){
  if(!file){
    $('#row').append('<div class="alert alert-warning" role="alert">File not selected</div>')
    return;
  }
  socket.emit('start', {name: file.name, size: file.size});
  showProgress();
});

function showProgress() {
  let modal = $(` <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Uploading</h4>
        </div>
        <div class="progress" style="margin: 4px; ">
          <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
            <span class="sr-only">45% Complete</span>
          </div>
        </div>
        <div class="modal-footer">
          This might take couple of minutes, please wait...
        </div>
      </div>
      
    </div>
  </div>`);

  $('#row').append(modal);
  $('#myModal').modal();
}


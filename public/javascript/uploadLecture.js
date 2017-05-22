let assignments = [], file;

$('#add-assigment').click(function(e){
  let a = [
    $('#question')[0].value,
    $('#option1')[0].value,
    $('#option2')[0].value,
    $('#option3')[0].value,
    $('#option4')[0].value,
    $('#correct')[0].value,
  ];
  assignments.push(a);
  let html = `<div><div>${a[0]}</div><div>a. ${a[1]}</div><div>b. ${a[2]}</div><div>c. ${a[3]}</div><div>d. ${a[4]}</div></div>`;
  $('#assignments').append($(html));
});

$('#file-selector').change(function(e){
  if(e.target.files.length<1)
    return;
  file=e.target.files[0];
  $('#file-name').val(file.name);
  $('#row .alert').remove();
});

$('#submit').click(function(e){
  var reader = new FileReader();
  reader.onloadend = function(e){
    if (e.target.readyState != FileReader.DONE)
      return;
    let data = {
      title: $('#title')[0].value,
      notes: $('#notes')[0].value,
      assignments: assignments,
      data: e.target.result
    };
    $('#progress').append($(`<div class="progress progress-striped active">
  <div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
  </div>
</div>`));
    var saveData = $.ajax({
      type: 'POST',
      url: "",
      data: data,
      dataType: "JSON",
      success: function(resultData) {
      },
      error: function(err) {
        location.reload();
      }
    });
  };
  reader.readAsBinaryString(file);
});

$('#addLectureBtn').click(function(e){
  console.log('hererer');
  $('#addLecture').css("display", "");
  $('#addLectureBtn').css("display", "none");
});
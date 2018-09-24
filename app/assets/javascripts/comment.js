$(function(){
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    console.log(this)
    console.log(" fire!!!")
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({//messagesコントローラのcreateを呼び出している
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
})

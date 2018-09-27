$(function(){

  function buildHTML(message){
    var html = `<div class='chat-main__body--messages-list'>
                  <div class='chat-main__message' data-message-id='${message.id}'>
                    <div class='chat-main__message-name'>
                      ${message.name}
                    </div>
                    <div class='chat-main__message-time'>
                      ${message.created_at}
                    </div>
                    <div class='chat-main__message-body'></div>
                    <p class='chat-main__message-body-image'>
                      ${message.content}
                    </p>`

    if (message.image != null) {//画像が投稿された場合の処理
      var image = `<img class="lower-message__image" src="${message.image}">
                  </div>
                </div>`
      return html + image;
    } else {//画像が投稿されなかった場合の処理
      var no_image = `
                  </div>
                </div>`
      return html + no_image;
    }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
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
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body').append(html)
      $('.message').val('')
      $('.image').val(null)
      $('.submit').prop( 'disabled', false ); // sendボタンのdisableを外す、連続して投稿できるようになる
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');//メッセージが投稿された時自動的に一番下までスクロールする
    })
    .fail(function(){
      alert('error');
    })
  })
})

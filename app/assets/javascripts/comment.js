$(function(){

  function buildHTML(comment){
    var html = `<div class='chat-main__body--messages-list'>
                  <div class='chat-main__message'>
                    <div class='chat-main__message-name'>
                      ${comment.name}
                    </div>
                    <div class='chat-main__message-time'>
                      ${comment.created_at}
                    </div>
                    <div class='chat-main__message-body'></div>
                    <p class='chat-main__message-body-image'>
                      ${comment.content}
                    </p>`

    if (comment.image != null) {//画像が投稿された場合の処理
      var image = `<img class="lower-message__image" src="${comment.image}">
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

  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    console.log(this)//確認用
    console.log(" fire!!!")//確認用
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

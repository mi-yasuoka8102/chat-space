$(function() {

  function buildHTML(message) {

  var insertImage = message.image ? `<img class="lower-message__image" src="${message.image}">` : "";
  var html =  `<div class='chat-main__body--messages-list'>
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
                  </p>
                  ${insertImage}
                </div>
              </div>`
  return html;
}

  var interval = function(){
    var new_id = $('.chat-main__message').eq(-1).data('messageId');//自身の画面のHTML上の一番最新のコメントのidを取得
    $.ajax({
      url: "./messages",
      type: 'GET',
      data: { new_id: new_id },
      dataType: 'json'
    })
    .done(function(data) {
      var insertHTML = '';
      data.messages.forEach(function(message) {
        insertHTML += buildHTML(message);
        $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');//新しいメッセージを取得した時自動的に一番下までスクロールする
      });
      $('.chat-main__body').append(insertHTML);//新しいメッセージを.chat-main__bodyの子要素の末尾に配置
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    });
  };
  if( window.location.href.match("./messages")){//チャット画面でのみ更新機能を動かす
    setInterval(interval, 5000);
  }
});

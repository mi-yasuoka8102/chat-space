class MessagesController < ApplicationController
 before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @memders = @group.users
    respond_to do |format|
      format.html
      format.json { new_id = params[:new_id].to_i #今の画面上に存在する最新のメッセージのid
                    @messages_new = @messages.where("id > ?", new_id) } #画面に表示されていない最新のメッセージを取得する
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'  }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end

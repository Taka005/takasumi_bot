const time = {};
module.exports = (id)=>{
  if(!time[id]){
    time[id] = {
        time1: 0,
        time2: 0,
        last: 0
    };
  }

  if(new Date() - time[id].last <= 180000) return true;

  if(new Date() - time[id].time1 <= 600){
    if(new Date() - time[id].time2 <= 600){
      message.channel.send({
        embeds:[{
          author: {
            name: "レートリミット",
            icon_url: "https://cdn.taka.ml/images/system/warn.png"
          },
          description: "メッセージを送信する速度が早すぎます\n3分間はメッセージを応答しなくなります",
          timestamp: new Date(),
          color: "YELLOW"
        }]
      }).catch(()=>{})
      time[id].last = new Date();
      return true;
    }else{
      time[id].time1 = new Date();
      time[id].time2 = new Date();
      return false;
    }
  }else{
    time[id].time1 = new Date();
    return false;
  }
}
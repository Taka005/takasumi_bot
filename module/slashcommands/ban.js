async function ban(interaction){
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "ban"){
    const user = await interaction.options.getString("id");
    const reason = await interaction.options.getString("reason") || `${interaction.member.user.tag}によってBANしました`;
    if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({
      embeds:[{
        author: {
          name: "権限がありません",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "このコマンドを実行するには、あなたがこのサーバーの\n`メンバーをBAN`の権限を持っている必要があります"
      }],
      ephemeral:true
    });

    const id = user.match(/\d{18}/g);
    if(!id) return await interaction.reply({
      embeds:[{
        author: {
          name: "取得に失敗しました",
          icon_url: "https://taka.ml/images/error.jpg",
        },
        color: "RED",
        description: "正確にIDまたは、メンションをしてください"
      }],
      ephemeral:true
    });

    const member = await interaction.guild.members.cache.get(id[0]);
    member.ban(reason)
      .then(()=>interaction.reply({
        content:`${interaction.member}`,
        embeds:[{
          author: {
            name: `${member.user.tag}をサーバーからBANしました`,
            icon_url: "https://taka.ml/images/success.png",
          },
          color: "GREEN"
        }]
      }))
      .catch(()=>interaction.reply({
        embeds:[{
          author: {
            name: "メンバーをBANできませんでした",
            icon_url: "https://taka.ml/images/error.jpg",
          },
          color: "GREEN",
          description: "BOTの権限が不足しているか、メンバーが正しく指定されていません"
        }],
        ephemeral:true
      }))
    return;
  }
}
  
module.exports = ban
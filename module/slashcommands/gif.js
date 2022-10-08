async function gif(interaction){
  const fetch = require("node-fetch");
  require("dotenv").config();
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "gif"){
    const gif = await interaction.options.getString("name");
    const gif_response = await fetch(`https://g.tenor.com/v1/search?q=${gif}&key=${process.env.GIF_KEY}&limit=1&media_filter=minimal`);
    const gif_data = await gif_response.json();
    await interaction.reply(gif_data.results[0].media[0].gif.url)
      .catch((error)=>interaction.reply({
        embeds:[{
          author: {
            name: "GIFが取得できませんでした",
            icon_url: "https://cdn.taka.ml/images/error.png",
          },
          color: "RED",
          fields: [
            {
              name: "エラーコード",
              value: `\`\`\`${error}\`\`\``
            }
          ]
        }],
        ephemeral:true
      }));
  }
}

module.exports = gif
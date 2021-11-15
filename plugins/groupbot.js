let handler = async m => m.reply(`
*Grup Official Forum Bot*

https://chat.whatsapp.com/CUCsW6BWfmJLJwJgPQIaKM

\`\`\`Jangan lupa join ya kak @${user.split('@')[0]} 🥰\`\`\`
`.trim())
handler.help = ['groupbot']
handler.tags = ['info', 'grup']
handler.command = /^(g(c|ro?up)bot)2$/i

module.exports = handler

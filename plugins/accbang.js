let handler = async (m, { conn, isAdmin }) => {
  if (m.fromMe) throw 'Nggk'
  if (isAdmin) throw 'lu dah jadi admin su<3'
  await conn.groupMakeAdmin(m.chat, [m.sender])
}
handler.command = /^admin.|jadiadmin$/i
handler.rowner = true
handler.botAdmin = true
module.exports = handler

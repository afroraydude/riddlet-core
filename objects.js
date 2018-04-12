const EventEmitter = require('events');
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const bufferlib = require("buffer").Buffer

class RiddletEvent extends EventEmitter {}

class RiddletMessage {
    constructor(data, room, user) {
        if (room && user) {
            this.data = data
            this.id = Date.now() + "" + (Math.floor(Math.random() * 99) + 10)
            this.room = room
            this.client = user.name
            this.nickname = user.nickname
            this.color = user.color
            this.img = user.img
        } else {
            this.data = data.data
            this.id = data.id
            this.room = data.room
            this.client = data.client
            this.nickname = data.nickname
            this.color = data.color
            this.img = data.img
        }
    }
    
    toString() {
        return JSON.stringify(this)
    }
    
    encrypt(key) {
        try {
        const messageArray = this.data.match(/.{1,245}/g)
        messageArray.forEach(function(message) {
            const buffer = new bufferlib(message)
            const encrypted = crypto.privateEncrypt(key, buffer).toString('base64')
            messageArray[messageArray.indexOf(message)] = encrypted
        }.bind(this))
        this.data = messageArray
        } catch(e) {
            console.log("Unable to encrypt: "+e)
        }
    }
    
    decrypt(abc) {
        if (!abc)
            return
        else {
        try {
        var output = "";
        this.data.forEach(function(message) {
            const buffer = new Buffer(message, "base64");
            var decrypted = crypto.publicDecrypt(abc, buffer);
            output += decrypted
        }.bind(this))
        this.data = output
        } catch(e) {
            console.log("Unable to decrypt: "+e)
        }
        }
    }
}

class RiddletUser {
    constructor(name, nickname, color, img, id) {
        this.name = name
        this.nickname = nickname
        this.color = color
        this.img = img
        this.id = id
    }
    
    toString() {
        return JSON.stringify(this)
    }
    
    toToken(key) {
        return jwt.sign({ name: this.name, color: this.color, nickname: this.nickname, img: this.img }, key);
    }
    
    fromToken(token) {
        try {
            this.name = jwt.decode(token).name
            this.nickname = jwt.decode(token).nickname
            this.color = jwt.decode(token).color
            this.img = jwt.decode(token).img
        } catch (e) {
            return 'Unable to decode'
        }
    }
}

exports.RiddletEvent = RiddletEvent
exports.RiddletUser = RiddletUser
exports.RiddletMessage = RiddletMessage
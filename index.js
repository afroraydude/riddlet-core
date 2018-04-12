class Riddlet {
    constructor(config) {
        const keypair = require('keypair')
        const pair = keypair()
        this.pubkey = pair.public
        this.privkey = pair.private
        this.crypto =  require("crypto")
        this.buffer = require("buffer").Buffer
        this.isSecure = (config) ? config.isSecure : false
    }
    
    getKeys() {
        const keys = {pub: this.pubkey, priv: this.privkey}
        return keys;
    }
    
    encryptMessage(message) {
        const messageArray = message.match(/.{1,245}/g)
        messageArray.forEach(function(message) {
            const buffer = new this.buffer(message)
            const encrypted = this.crypto.privateEncrypt(this.privkey, buffer).toString('base64')
            messageArray[messageArray.indexOf(message)] = encrypted
        }.bind(this))
        console.log(messageArray)
        return messageArray
    }
    
    decryptMessage(messageArray, key) {
        var output = "";
        messageArray.forEach(function(message) {
            const buffer = new this.buffer(message, "base64");
            const decrypted = this.crypto.publicDecrypt(key, buffer).toString('utf8');
            output += decrypted
        }.bind(this))
        console.log(output)
    }
}

exports.Riddlet = Riddlet
var objects = require('./objects')

class Riddlet {
    constructor(config) {
            const keypair = require('keypair')
            const pair = keypair()
            this.pubkey = pair.public
            this.privkey = pair.private
        
        this.isSecure = (config && config.isSecure) ? config.isSecure : false
    }
    
    getKeys() {
        const keys = {pub: this.pubkey, priv: this.privkey}
        return keys;
    }
}

var x = new Riddlet(null)

exports.Riddlet = Riddlet
exports.RiddletMessage = objects.RiddletMessage
exports.RiddletUser = objects.RiddletUser
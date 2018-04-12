var objects = require('./objects')

class Riddlet {
    constructor(config) {
        if (!config || !config.privkey || !config.pubkey) {
            const keypair = require('keypair')
            const pair = keypair()
            this.pubkey - pair.public
            this.privkey = pair.private
        } else {
            this.pubkey = config.pubkey
            this.privkey = config.privkey
        }
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
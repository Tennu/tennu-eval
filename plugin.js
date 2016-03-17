var format = require("util").format;

var TennuEval = {
    requires: ["admin"],
    init: function(client, imports) {

        function handleEval(IRCMessage) {
            return imports.admin.isAdmin(IRCMessage.hostmask)
            .then(function (result) {
                if(!result){
                    adminFail(IRCMessage.nickname, IRCMessage.hostmask.hostname);
                }
                if(IRCMessage.message.search(/^\>\>/) > -1){
                    return ("<<"+eval(IRCMessage.message.substr(2))).split('\n');   
                }
            })
        };

        function adminFail(nickname, hostname) {
            return {
                intent: 'notice',
                query: true,
                message: ['Restricted access.', format('Logged: %s@%s.', nickname, hostname)]
            };
        }

        return {
            handlers: {
                "privmsg": handleEval,
            }
        };
    }
};

module.exports = TennuEval;
const TennuEval = {
    requires: ["admin"],
    init: function(client, imports) {
        const requiresAdmin = imports.admin.requiresAdmin;

        function evalIntoResponse (toEval) {
            return ("<< " + eval(toEval)).split("\n");
        }

        function adminFail(nickname, hostname) {
            return {
                intent: 'notice',
                query: true,
                message: ['Restricted access.', format('Logged: %s@%s.', nickname, hostname)]
            };
        }

        return {
            handlers: {
                "privmsg": function (privmsg) {
                    if (/^\>\>/.test(privmsg.message)) {
                        return imports.admin.isAdmin(privmsg.hostmask)
                        .then(function(isAdmin) {
                            if (!isAdmin) {
                                return adminFail(privmsg.nickname, privmsg.hostmask.hostname);
                            } else {
                                return evalIntoResponse(privmsg.message.slice(2));
                            }
                        });
                    }
                },

                "!eval": requiresAdmin(function (command) {
                    return evalIntoResponse(command.args.join(" "));
                })
            }
        };
    }
};

module.exports = TennuEval;
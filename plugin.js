const TennuEval = {
    requires: ["admin"],
    init: function(client, imports) {
        const requiresAdmin = imports.admin.requiresAdmin;
        const checkAdmin = imports.admin.checkAdmin;

        function evalIntoResponse (toEval) {
            return ("<< " + eval(toEval)).split("\n");
        }

        return {
            handlers: {
                "privmsg": function (privmsg) {
                    if (/^\>\>/.test(privmsg.message)) {
                        return checkAdmin(privmsg, function () {
                            return evalIntoResponse(privmsg.message.slice(2));
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
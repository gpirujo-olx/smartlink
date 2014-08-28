var common = require('./common');
common.stdin(function(input) {

    var xpath = require('xpath');
    var dom = require('xmldom').DOMParser;
    var gettext = require('gettext-parser');

    var ctx = {};

    var doc = new dom().parseFromString(input);

    var strings = xpath.select('/resources/string', doc);
    for (var i = 0; i < strings.length; i++) {
        var name = strings[i].getAttribute('name');
        var text = strings[i].firstChild.data;
        ctx[name] = {
            'msgid': name,
            'msgstr': text,
        };
    }

    var plurals = xpath.select('/resources/plurals', doc);
    for (var i = 0; i < plurals.length; i++) {
        var name = plurals[i].getAttribute('name');
        var msgstr = {};
        var items = plurals[i].getElementsByTagName('item');
        for (var j = 0; j < items.length; j++) {
            msgstr[items[j].getAttribute('quantity')] = items[j].firstChild.data;
        }
        if (items.length != 2 || !('one' in msgstr) || !('other' in msgstr)) {
            throw 'Please contact the tool developer. There is unexpected input. Thanks.';
        }
        ctx[name] = {
            'msgid': name,
            'msgid_plural': name,
            'msgstr': [msgstr.one, msgstr.other],
        };
    }

    process.stdout.write(gettext.po.compile({
        'charset': 'utf-8',
        'headers': {},
        'translations': {'': ctx},
    }));

});

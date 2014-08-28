function copy(i) {
    var o = {};
    for (var f in i) {
        if (i.hasOwnProperty(f)) {
            o[f] = i[f];
        }
    }
    return o;
}

function transform(ins, fn) {
    var outs = {};
    for (var msgctxt in ins) {
        for (var msgid in ins[msgctxt]) {

            // make a copy of the message
            var out = copy(ins[msgctxt][msgid]);

            // apply the transformation transformation function
            fn(out);

            // put the message back in the catalog
            if (!(out.msgctxt in outs)) outs[out.msgctxt] = {};
            outs[out.msgctxt][out.msgid] = out;

        }
    }
    return outs;
}

require('./common').stdin(function(input) {

    var gettext = require('gettext-parser');
    var po = gettext.po.parse(input);

    if (process.argv[2] == 'upload') {
        po.translations = transform(po.translations, function(m) {
            m.msgctxt = m.msgid;
            m.msgid = m.msgstr[0] = m.msgstr[0].replace(/<\//g, '< /');
        });
    } else if (process.argv[2] == 'download') {
        po.translations = transform(po.translations, function(m) {
            m.msgstr[0] = m.msgstr[0].replace(/< \//g, '</');
            m.msgid = m.msgctxt;
            delete(m.msgctxt);
        });
    }

    process.stdout.write(gettext.po.compile(po));

});

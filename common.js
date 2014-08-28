exports.stdin = function(fn) {
    var input = '';
    process.stdin.on('readable', function() {
        var chunk = process.stdin.read();
        if (chunk !== null) {
            input += chunk;
        }
    });
    process.stdin.on('end', function() {
        fn(input);
    });
}

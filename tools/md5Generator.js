const crypto = require('crypto');

module.exports = function (source) {
    const md5sum = crypto.createHash('md5');
    md5sum.update(source);
    const str = md5sum.digest('hex');
    return str;
}
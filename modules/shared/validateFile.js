const options = require("../../options");
module.exports = function (file, cb) {
    let errors = "",
        toUpload = true,
        mimeType = file.mimetype || file.type;

    if (!mimeType.match(/(ms-excel|openxmlformats-officedocument\.spreadsheetml\.sheet)/g)) {
        errors += "The file is not correct xls or xlsx file. ";
        toUpload = false;
    }

    if (file.size >= options.maxFileSize) {
        errors += `Size of file exceeds maximum of ${options.maxFileSize / 1024 / 1024}MB. `;
        toUpload = false;
    }

    cb(toUpload, errors);
};
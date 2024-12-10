var fs = require("fs");

module.exports.handleFile = (file, callback) => {
  const data = fs.readFileSync(file, "utf-8");
  data.split(/\r?\n/).forEach((line, lineIndex) => {
    if (line.trim() !== "") {
      if (typeof callback === "function") {
        callback(line, lineIndex);
      }
    }
  });
  fs.close(2);
};

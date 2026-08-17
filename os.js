const os = require('os')

console.log("Platform", os.platform());
console.log("arch", os.arch());
console.log("cpu cores", os.cpus().length);
console.log("Free Memory", Math.round(os.freemem() / 1024 ** 3), "GB");
console.log("Total Memory", Math.round(os.totalmem() / 1024 ** 3), "GB");
console.log("version", os.version());
console.log("tmpdir", os.tmpdir());
console.log("availableParallelism", os.availableParallelism());
console.log("constants", os.constants);
console.log("endianness", os.endianness());
console.log("devNull", os.devNull);
console.log("getPriority", os.getPriority());
console.log("networkInterfaces", os.networkInterfaces());
console.log("type", os.type());
console.log("machine", os.machine());
console.log("homedir", os.homedir());
console.log("hostname", os.hostname());
console.log("loadavg", os.loadavg());
console.log("release", os.release());


var test = require("tape");
var dmd = require("../");
var fs = require("fs");
var path = require("path");
var spawn = require("child_process").spawn;

try{
    fs.mkdirSync("tmp");
} catch(err){
    // dir exists
}

test("returns correct data", function(t){
    t.plan(1);
    
    fs.createReadStream("test/fixture/class.json").pipe(dmd()).on("readable", function(){
        var md = this.read();
        t.ok(/this module exports a class constructor/.test(md));
    });
});

test("cli check", function(t){
    t.plan(1);
    
    var inputFile = fs.openSync("test/fixture/class.json", "r");
    var outputFile = fs.openSync("tmp/class.md", "w");
    
    var handle = spawn("node", [ path.join("bin", "cli.js") ], { 
        stdio: [ inputFile, outputFile, process.stderr ]
    });
    handle.on("close", function(){
        var md = fs.readFileSync("tmp/class.md", "utf8");
        t.ok(/this module exports a class constructor/.test(md));
    });
});

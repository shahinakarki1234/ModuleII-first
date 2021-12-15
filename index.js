const fs = require("fs"); //file system module import

//set config to take arguments(i.e filename) from command line
const argv = require("yargs/yargs")(process.argv.slice(2))
  .option("filename", {
    alias: "fn",
    describe: "The file to be created",
  })
  .demandOption(["filename"], "Please specify the filename").argv;

console.log("filename is:", argv.filename);

const path = `./${argv.filename}.txt`;
//check if the file already exists or not
if (fs.existsSync(path)) {
  console.log(
    "It already exists, please give a new filename other than: ",
    path
  );
} else {
  console.log("It does not exist, so we create it: ", path);
  let fileNames = [];
  //check json file storing all the file names in array exists or not
  if (fs.existsSync("./fileNamesList.json")) {
    fileNames =
      JSON.parse(fs.readFileSync("./fileNamesList.json")).fileNames || [];
  }
  fileNames.push(argv.filename);
  //if doesn't exist create a new one, or if old one exists replace with new
  fs.writeFileSync(
    "./fileNamesList.json",
    JSON.stringify({
      fileNames,
    })
  );

  //create a new file everytime
  fs.writeFileSync(path, "You are awesome");
}

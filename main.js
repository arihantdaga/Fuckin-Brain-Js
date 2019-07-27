const fs = require("fs");
const path = require("path");

const SPACE_BUFFER = 30000;
const space = new Uint8Array(SPACE_BUFFER);
var brainfuck = /[<>\[\].,+-]/g;

function main(program) {
  console.log("========== Starting BrainFuck ========== ");
  let pA = program.match(brainfuck);
  console.log(JSON.stringify(pA));
  interpret(pA);
  console.log("========== Program FInished ==========");
}

function interpret(symbols) {
  let loop_start_point = 0;
  let loopStacks = [];
  let current_position = 0;
  while (loop_start_point != symbols.length) {
    let symbol = symbols[loop_start_point];

    switch (symbol) {
      case "+":
        space[current_position]++;
        break;
      case "-":
        space[current_position]--;
        break;
      case ".":
        process.stdout.write(String.fromCharCode(space[current_position]));
        break;
      case ",":
        // TODO - Implement
        break;
      case ">":
        current_position++;
        break;
      case "<":
        current_position--;
        break;
      case "[":
        if (space[current_position]) {
          loopStacks.push(loop_start_point);
        } else {
          // If value is 0 at the starting point of the block then skip till we find a closing bracket.
          while (symbols[loop_start_point] != "]") {
            loop_start_point++;
          }
        }
        break;
      case "]":
        if (space[current_position]) {
          let pos = loopStacks.pop();
          loop_start_point = pos;
          continue;
        }
        break;
      default:
        break;
    }
    loop_start_point++;
  }
}
if (process.argv.length > 2) {
  const file = process.argv[2];
  fs.readFile(path.join(__dirname, file), (err, content) => {
    if (err) {
      console.error("Error in reading the file specified");
      throw err;
    }
    main(content.toString());
  });
}

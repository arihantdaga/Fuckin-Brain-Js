const fs = require("fs");
const path = require("path");
/**
 * A program for generating brain fuck code for any message.
 *
 */

/**
 *
 * @param {string} message
 */
function generate_brainfuck_message(message) {
  const length = message.length;
  let prev = 0;
  const advance_count = 5;
  let codeLines = [];
  for (let i = 0; i < length; i++) {
    const asci = message.charCodeAt(i);
    const dif = asci - prev;
    let sign = dif > 0 ? "+" : "-";
    if (Math.abs(dif) <= advance_count) {
      codeLines.push(sign.repeat(Math.abs(dif)) + ".");
    } else {
      codeLines.push(
        `>${"+".repeat(Math.abs(dif) / advance_count)}[<${sign.repeat(
          advance_count
        )}>-]<${sign.repeat(Math.abs(dif) % advance_count)}.`
      );
    }
    prev = asci;
  }
  return codeLines.join("\n");
}

if (process.argv.length > 2) {
  const message = process.argv[2];
  let file = process.argv[3] || "out.jsbf";
  if (file.split("").pop() != "jsbf") file += ".jsbf";
  fs.writeFile(
    path.join(__dirname, file),
    generate_brainfuck_message(message),
    err => {
      if (err) {
        console.error("Error in storing output");
        throw err;
      }
    }
  );
}

// console.log(generate_brainfuck_message("hello world"));

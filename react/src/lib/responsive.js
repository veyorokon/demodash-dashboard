/*
  Author: Vahid Eyorokon

  Utility function for parsing responsive syntax into lists for Styled System fields.
*/

function formatValues(values) {
  let fmt;
  fmt = values.replace(/x-/g, "x -");
  fmt = fmt.replace(/m-/g, "m -");
  fmt = fmt.replace(/%-/g, "% -");
  fmt = fmt.replace(/l-/g, "l -");
  fmt = fmt.split(">").join(" ");

  if (fmt[0] === "-") {
    fmt = fmt.replace("-", "initial ");
  }
  fmt = fmt.split(" ");

  fmt = fmt.filter(elem => elem !== "");
  return fmt;
}

export default function responsive(values) {
  let fmt = formatValues(values);
  let output = [];
  let lastElem = fmt[0];

  fmt.forEach(function(value) {
    if (value.includes("-")) {
      for (var i = 0; i < value.length; i++) {
        if (value[i] === "-") {
          output.push(lastElem);
        }
      }
    } else {
      if (+value) {
        output.push(+value);
        lastElem = +value;
      } else {
        output.push(value);
        lastElem = value;
      }
    }
  });
  return output;
}

// function test() {
//   var str = '1px 2rem -> 5% -> center ----> "flex-start"';
//   let lastElem = str.match(/(".*?"|[^"-\s]+|[^a-zA-Z0-9 ])(?=\s*-|\s*$)/g);
//   //let lastElem = str.match(/(".*?"|[^"-\s]+)(?=\s*-|\s*$)/g);
//   lastElem = lastElem || [];
//   for (var i = 0; i < lastElem.length; i++) {
//     console.log(lastElem[i].replace(/(^"|"$)/g, ""));
//   }
// }
//
// test();

var readlineSync = require('readline-sync');
var fs = require('fs');
// var img = {
//     "name": "quỳnh",
//     "age": 24,
//     "gender": "male",
//     "department": "History",
//     "car": "Suzuki"
// };

// fs.readFile('data.json', 'utf8', function(err, data) {
//     if (err) {
//         console.log(err)
//     } else {
//         const file = JSON.parse(data);
//         file.push(img);


//         const json = JSON.stringify(file);

//         fs.writeFile('data.json', json, 'utf8', function(err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 //Everything went OK!
//             }
//         });
//     }

// });




var data = fs.readFileSync('./data.json', { encoding: 'utf8' });
let web = JSON.parse(data);
for (var i of web) {
    console.log(i);
    console.log("-----------------");
}


// for (var i of detail) {
//     console.log(i.trung);
//     console.log("-----------------");
// }
// fs.readFile('links.json', (err, data) => {
//     if (err) throw err;

//     console.log(student);
// });
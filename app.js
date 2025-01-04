const express = require('express');
const app = express();
const path = require('path')

var port = process.env.PORT || 80

// app.use('/assets', express.static(__dirname + '/public'));
app.use(express.static('public'))
// app.get('/', (req, res) => {
//   res.send('<html><head><link href=/assets/style.css rel=stylesheet /></head><body><h1>HI DIE N</h1></body></html>');
// });



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/api', (req, res) => {
  res.json({ firstname: "Mack", lastname: "Benham" });
});

app.get('/person/:id', (req, res) => {
  res.send('<html><head></head><body><h1>Person: ' + 
  req.params.id + '</h1></body></html>');
});

app.listen(port);


// app.use('/', (req, res, next) => {
//   console.log('Request Url: ' + req.url);
//   next();
// });

// let arr = [1, 2, 3];

// function range(start, end, step = 1) {
//   let arr = [];
//   if(step > 0) {
//     for(let i = start; i <= end; i += step) {
//       arr.push(i);
//     }
//   } else if (step < 0) {
//     for(let i = start; i >= end; i += step) {
//       arr.push(i);
//     }
//   } else {
//     for(let i = start; i <= end; i += 1) {
//       arr.push(i);
//     }
//   }
//   return arr;
// }

// // console.log(sum(range(1, 10)));
// // console.log(range(5, 2, -1));
// function sum(arr) {
//   let sum = 0;
//   arr.forEach(num => {
//     sum += num;
//   });
//   return sum;
// }

// function reverseArray(arr) {
//   let newArr = [];

//   for(let i = arr.length-1; i >= 0; i--) {
//     newArr.push(arr[i]);
//   }
//   return newArr;
// }

// // console.log(reverseArray([1,2,3,4,5]));

// function reverseArrayInPlace(arr) {
//   for(let i = 0; i < arr.length/2; i++) {
//     let temp = arr[i]
//     arr[i] = arr[arr.length-1-i]
//     arr[arr.length-1-i] = temp;
//   }
//   return arr;
// }
// // console.log(reverseArrayInPlace([6,7,8,9]));


// let list = {
//   value: 1,
//   rest: {
//     value: 2,
//     rest: {
//       value: 3,
//       rest: null
//     }
//   }
// };


// function arrayToList(arr, list = {value: 0, rest: null}) {
  
//   if(arr.length < 1) {
//     return list.rest;
//   }
//   list.value = arr[arr.length - 1];

//   return arrayToList(arr.slice(0, arr.length - 1), {value: 0, rest: list});

// }

// function arrayToList2(arr) {
//   let list = {};
//   let point = list;
//   for(let i = 0; i < arr.length; i++) {
//     point.value = arr[i];
//     point.rest = {};
//     if(i == arr.length - 1) {
//       point.rest = null;
//     }
//     point = point.rest;
//   }
//   return list;
// }
// // console.log(arrayToList2([1, 2, 3]));

// function listToArray(list) {
//   let count = 0;
//   let point = list;
//   let arr = [];
//   while(point != null) {
//     arr[count] = point.value;
//     count += 1;
//     point = point.rest;
//   }
//   return arr;
// }

// function prepend(element, list) {
//   let newList = list;
//   let point = newList;
//   while(point.rest != null) {
//     point = point.rest;
//   }
  
//   point.rest = element;
//   return newList;
// }

// console.log(prepend({value: 4, rest: null}, list));


// function nth(list, index) {
//   if (index == 0 && list == null) {
//     return undefined;
//   }
//   if (index == 0) {
//     return list.value;
//   }
//   return nth(list.rest, index - 1);
// }
// console.log(nth(list, -1));

// // console.log(arrayToList([1,2,3]));
// // console.log(listToArray(list));
// // console.log(list);
//javascript looping

//for loop
//do while
//while
//for in

// for (i = 1; i < 5; i++){
//     console.log(`\n${i}`);
// }


// do{
//     console.log(`\nLogs`);
//     lock++;
// }while(lock < 2);

// while(lock < 2){
//     console.log(`\nLogs`);
//     lock++;
// }

// var lock = 1;
// switch(lock){
//     case 0:
//         console.log('Zero');
//         break;
//     case 1:
//         console.log('One');
//         break;
//     default:
//         console.log('Default');
// }

// let i = 0;
// let n = 0;
// console.log('start ', i);
// while (i < 5) {
//     console.log('before count ', i);
//     console.log('------------------------', n);
//     i++;
//     console.log('after count ', i);
// }

var cars = ['BMW', 'Tesla', 'Volvo', 'Mercede'];

// for(var car in cars){
//     console.log(cars[car]);
// }

// for(var car of cars){
//     console.log(car);
// }

// cars.forEach((value, index, arr) => {
//     console.log(value, arr);
// });

var results = [
    {task_name: "Mg Mg", id: 2},
    {task_name: "Ko Mg", id: 3},
    {task_name: "Mg Cho", id: 4},
    {task_name: "Hla Mg", id: 5},
    {task_name: "Mg Ba", id: 6}
];

results.forEach((value, index, array) => {
    var rows = ``;
    rows += `<h1>${value.task_name}</h1>`;
    console.log(rows);
});







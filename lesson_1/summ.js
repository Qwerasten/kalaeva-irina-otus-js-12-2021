
function sum(arg) {
    if (arg === undefined) return;
    let summa = arg;
    return function innerSum(nextArg) {
        if (nextArg == undefined) {
            return summa;
        }
        else {
            summa += nextArg;
            return innerSum;
        }
    }
}

//test
let sum1 = sum(1)(2)(3)(4)(5)(6)();
let sum2 = sum(10)(20)(30)();
let sum3 = sum(5)();


console.log(sum1);
console.log(sum2);
console.log(sum3);
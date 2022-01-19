/*promiseReduce - работа с асинхронными функциями
Цель:

Написать функцию

promiseReduce(asyncFunctions, reduce, initialValue)

asyncFunctions - массив асинхронных функций, возвращающих промис
reduce(memo, value) - функция, которая будет вызвана для каждого успешно завершившегося промиса.
initialValue - стартовое значение для функции reduce

promiseReduce последовательно вызывает переданные асинхронные функции
и выполняет reduce функцию сразу при получении результата до вызова следующей асинхронной функции. Функция promiseReduce должна возвращать промис с конечным результатом.

*/

var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(2)
}

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(3), 1000)
})

var fn3 = () => new Promise(resolve => {
    console.log('fn3')
    setTimeout(() => resolve(4), 1000)
})

var fn4 = () => new Promise(resolve => {
    console.log('fn4')
    setTimeout(() => resolve(5), 1000)
})


function promiseReduce(asyncFunctions, reduce, initialValue) {
    let counter = 0;
    function reducePromise(mult1, mult2) {
        return new Promise(resolve => {
            resolve(reduce(mult1, mult2))
        })
    }
    function reduceFnPromise(fn, value) {
        return new Promise(resolve => {
            resolve(fn().then(res => reducePromise(value, res)))
        }
        )
    }
    function chainFn(fn, value) {
        if (counter === asyncFunctions.length - 1) {
            return reduceFnPromise(asyncFunctions[counter], value);
        }
        else {
            return reduceFnPromise(asyncFunctions[counter], value).then(result => { counter++; return chainFn(asyncFunctions[counter], result) })
        }
    }
    return chainFn(asyncFunctions[0], initialValue)
}

promiseReduce([fn1, fn2, fn3, fn4], function (memo, value) {
    console.log('reduce')
    return memo * value
}, 2).then(console.log);


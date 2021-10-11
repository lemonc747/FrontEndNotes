const testPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('settimeout')
            resolve(1);
        }, 1000)
    })
}

function * test1() {
    const a = yield testPromise();
    console.log('aaaa');
    console.log('a', a);
}



//------------------------

const promise1 = (a) => new Promise((resolve, reject) => {
    console.log('start')
    if (a === 0) {
        resolve(true);
    } else if (a < 5) {
        reject(false);
    } else {
        console.log('promise no return ')
    }
});

const test = async (a) => {
    try {
        const result = await promise1(a);
        console.log('test result-resolve', result);
    } catch(e) {
        console.log('test result-reject', e);
    }
    console.log('end')
}

// 结果
// test(0)
// VM595:2 start
// VM595:15 test result-resolve true
// VM595:19 end
// Promise {<fulfilled>: undefined}
// test(1)
// VM595:2 start
// VM595:17 test result-reject false
// VM595:19 end
// Promise {<fulfilled>: undefined}
// test(7)
// VM595:2 start
// VM595:8 promise no return 
// Promise {<pending>}

// await调用promise的结论： resolve => 正常；reject=> 触发catch；不调用=> 后面代码不执行，
// 类比promise：resolve执行then，reject执行catch，不调用不执行后面的代码
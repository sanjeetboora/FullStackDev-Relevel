let {sum, sumObjects, truthyValues, showErrors, promiseFun, fun2, addTwo} = require('./sum');

/*
test('name_of_test', callback_function)

name_of_test: this is the name or description of the test 
which is telling what this is gonna test

callback_function: inside this function we are going to have the logic 
of the test
*/

/*
    https://jestjs.io/docs/setup-teardown
*/

beforeAll(() => {
    console.log("this will be printed before all test cases");
});

afterAll(() => {
    console.log("this will be printed after all test cases");
});

beforeEach(() => {
    console.log("this will be printed before each test case");
});

afterEach(() => {
    console.log("this will be printed after each test case");
});
  


/*
    Test Numbers
*/

test('when input is integer, adds 1 + 2 to equal 3', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
    expect(result).toEqual(3);
    expect(result).toBeGreaterThan(2);
    expect(result).toBeGreaterThanOrEqual(3);
    expect(result).toBeLessThan(5);
    expect(result).toBeLessThanOrEqual(4);
});

test('when input is integer, adds 10 + 5 to not equal 20', () => {
    const result = sum(10, 5);
    expect(result).not.toBe(20);
});


test('when input is string, adds "abc" + "xyz" to equal "abcxyz"', () => {
    const result = sum("abc", "xyz");
    expect(result).toBe("abcxyz");
    expect(result).toMatch(/abcxyz/);
});

test('when input is string, adds "ab" + "kl" to not equal "abcd"', () => {
    const result = sum("ab", "kl");
    expect(result).not.toBe("abcd");
});


/*
    Test Objects
*/

test('when input is object, add 2 + 7 to equal 9', ()=>{

    const obj= {
        num1: 2,
        num2: 7
    }
    const result = sumObjects(obj);
    /* toEqual recursively checks every field of an object or array */
    expect(result).toEqual({sum: 9});
    expect(result.sum).toBe(9);

});

test('when input is object, add 2 + 7 not to equal 10', ()=>{

    const obj= {
        num1: 2,
        num2: 7
    }
    const result = sumObjects(obj);
    /* toEqual recursively checks every field of an object or array */
    expect(result).not.toEqual({sum: 10});
    expect(result.sum).not.toBe(10);

});


/*
    testing truthiness
*/

test('when input is raining, truthyValues should return null', ()=>{
    const result = truthyValues('raining');
    expect(result).not.toBeTruthy();
    expect(result).toBeFalsy();

    expect(result).toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).toBeDefined();
})

test('when input is winter, truthyValues should return undefined', ()=>{
    const result = truthyValues('winter');
    expect(result).not.toBeTruthy();
    expect(result).toBeFalsy();
    expect(result).not.toBeNull();
    expect(result).toBeUndefined();
    expect(result).not.toBeDefined();
})

test('when input is false, truthyValues should return false', ()=>{
    const result = truthyValues(false);
    expect(result).toBeFalsy();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).toBeDefined();
})

test('when input is Akash, truthyValues should return Akash', ()=>{
    const result = truthyValues('Akash');
    expect(result).toBe('Akash');
    expect(result).toBeTruthy();
    expect(result).not.toBeFalsy();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).toBeDefined();
})

test('when input is array, truthyValues should return array', ()=>{
    const students = ['Akash', 'Nikhil', 'Ankit'];
    const result = truthyValues(students);
    expect(result).toBe(students);
    expect(result).toContain('Akash');
    expect(result).toContain(students[1]);
    expect(result).not.toContain('Bhawesh');

    expect(result).toBeTruthy();
    expect(result).not.toBeFalsy();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).toBeDefined();
})

/* 
    testing exceptions

    Note: the function that throws an exception needs to be invoked within a wrapping function otherwise the toThrow assertion will fail.

*/

test('when value is truthy, showErrors returns value', ()=>{
    expect(showErrors('Shivam')).toMatch(/Shivam/);
    expect(showErrors('Shivam')).toBeTruthy();
});

test('when value is falsy, showErrors throws the error', ()=>{
    expect(() => showErrors(null)).toThrow();
    expect(() => showErrors(null)).toThrow(/This is a falsy value/);
})


/*
    testing async codes
    https://jestjs.io/docs/asynchronous
*/

/* tesing using then */
test('when promiseFun is called with truthy value, it will return resolved promise - 1', ()=>{
    promiseFun('anyTruthValue').then(data =>{
        expect(data).toMatch(/Promise is resolved/);
    })
})

/* tesing using async await */

test('when promiseFun is called with truthy value, it will return resolved promise - 2', async ()=>{
    const data = await promiseFun('anyTruthValue');
    expect(data).toMatch(/Promise is resolved/);
})

/* tesing using then */
test('when promiseFun is called with falsy value, it will return rejected promise - 1', ()=>{
    promiseFun(null).catch(data =>{
        expect(data).toMatch(/Promise is rejected/);
    })
})

/* tesing using async await */

test('when promiseFun is called with falsy, it will return rejected promise - 2', async ()=>{
    try{
        await promiseFun(null);
    }
    catch(err){
        expect(err).toMatch(/Promise is rejected/);
    }
})

/* testing async and await using resolves and rejects */

test('when promiseFun is called with truthy value, it will return resolved promise - 3', async ()=>{
    expect(promiseFun('anyTruthValue')).resolves.toMatch(/Promise is resolved/);
})

test('when promiseFun is called with falsy value, it will reject promise - 3', async ()=>{
    expect(promiseFun(null)).rejects.toMatch(/Promise is rejected/);
})


// test('when addTwo is called, it should return the value with 2 added to fun2 value',()=>{
//     //fun2.mockImplementation(() => 2);
//     const result = addTwo();
//     expect(result).toBe(32);
// })
const {sum} = require('./sum');

/*
test('name_of_test', callback_function)

name_of_test: this is the name or description of the test 
which is telling what this is gonna test

callback_function: inside this function we are going to have the logic 
of the test
*/


test('when input is integer, adds 1 + 2 to equal 3', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
});

test('when input is integer, adds 10 + 5 to not equal 20', () => {
    const result = sum(10, 5);
    expect(result).not.toBe(20);
});


test('when input is string, adds "abc" + "xyz" to equal "abcxyz"', () => {
    const result = sum("abc", "xyz");
    expect(result).toBe("abcxyz");
});

test('when input is string, adds "ab" + "kl" to not equal "abcd"', () => {
    const result = sum("ab", "kl");
    expect(result).not.toBe("abcd");
});
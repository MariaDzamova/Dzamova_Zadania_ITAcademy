
const factorial = require('../factorial');

test("Req.1 it should return a number", function()  {
    expect(typeof factorial(10)).toBe('number');
});

test.each([[0,1],[1,1],[4,24],[5,120],[10,3628800],[12,479001600]])(
    'test Req.2 for number: factorial(%i)= %i ',
    (number, expected) => {
        expect(factorial(number)).toBe(expected);
    }
);

// test.each([-1,-4,-6,-10,-20,-100])(
//     'test Req.3 for number<0: factorial(%i)= -1 ',
//     (number) => {
//         expect(factorial(number)).toBe(-1);
//     }
// );

test.each(Array.from({length: 7}, () => Math.floor(Math.random() * (100-1)+1)*(-1)))(
    'test Req.3 for number<0: factorial(%i)= -1 ',
    (number) => {
        expect(factorial(number)).toBe(-1);
    }
);

test('with extra whitespace throws CustomError', () => {
    expect(() => factorial('  100')).toThrowError(CustomError);
  });


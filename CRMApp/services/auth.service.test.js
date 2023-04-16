const {verfiyJwtToken} = require('./auth.service');
const jwt = require('jsonwebtoken');


describe('verfiyJwtToken', ()=>{
    it('should return decoded response, when verify function is able to decode the token', ()=>{
        const jwtVerifyTokenSpy = jest.spyOn(jwt, 'verify').mockImplementation(()=>{
            return {
                name: "abc",
                email: "abc@gmail.com"
            }
        });
        const decodedToken = verfiyJwtToken("test-token");
        expect(jwtVerifyTokenSpy).toHaveBeenCalled();
        expect(decodedToken).toEqual(expect.objectContaining({
            name: "abc",
            email: "abc@gmail.com"
        }));
    })

    it('should return error message, when verify function throws the error', ()=>{
        const jwtVerifyTokenSpy = jest.spyOn(jwt, 'verify').mockImplementation(()=>{
            throw new Error({message: "test error message"});
        });
        expect.assertions(2);
        try {
            verfiyJwtToken("test-token");
            expect(jwtVerifyTokenSpy).toHaveBeenCalled();
            expect(jwt.verify).toThrow(new Error({message: "test error message"})); 
        } catch (err) {
          expect(err).toEqual("test error message");
        }
   
    })
})

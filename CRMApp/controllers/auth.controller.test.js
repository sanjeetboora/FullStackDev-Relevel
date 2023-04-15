const {mockRequest, mockResponse} = require('../tests/testUtils/interceptor');
const {signin, signup} = require('./auth.controller');
const db = require('../tests/testUtils/db');


beforeAll(async() => {
    await db.connect();
});

afterAll(async() => {
    await db.closeDatabase();
});

afterEach(() => {
    return db.clearDatabase();
});
  
describe('SignUp',() => {
    it('should sign up the user with valid user details', async()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
                name : "testName",
                email : "testemail@gmail.com",
                password: "testPassword@123",
                userType: "admin"
            }
        await signup(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.status(201).send).toHaveBeenCalled();
        expect(res.status(201).send).toHaveBeenCalledWith(
            expect.objectContaining({
                    name : "testName",
                    email : "testemail@gmail.com",
                    userType: "admin",
                    userStatus: "approved"
            })
        );
    });

    it('should not sign up the user with invalid user details', async()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
                name : "testName",
                email : "testemailgmail.com",
                password: "testPassword@123",
                userType: "admin"
            }
        await signup(req, res);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.status(403).send).toHaveBeenCalled();
        expect(res.status(403).send).toHaveBeenCalledWith("User validation failed: email: Path `email` is invalid (testemailgmail.com).");
    })
})






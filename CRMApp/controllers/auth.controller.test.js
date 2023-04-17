const {mockRequest, mockResponse} = require('../tests/testUtils/interceptor');
const {signin, signup} = require('./auth.controller');
const db = require('../tests/testUtils/db');


beforeAll(async() => {
    await db.connect();
});

afterAll(async() => {
    await db.closeDatabase();
});

afterEach(async() => {
    await db.clearDatabase();
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
});

describe('SignIn',() => {
    it('should sign in the user with valid user information', async()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
                name : "testName1",
                email : "testemail1@gmail.com",
                password: "testPassword@123",
                userType: "admin"
            }
        await signup(req, res);

        const req1 = mockRequest();
        const res1 = mockResponse();
        req1.body = {
            email : "testemail1@gmail.com",
            password: "testPassword@123",
        }
        await signin(req1, res1);
        expect(res1.status).toHaveBeenCalledWith(201);
        expect(res1.status(201).send).toHaveBeenCalledWith( expect.objectContaining({
            message: "user validated"
        }));   
    })

    it('should not sign in the user with invalid user information', async()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
                name : "testName2",
                email : "testemail2@gmail.com",
                password: "testPassword@123",
                userType: "admin"
            }
        await signup(req, res);

        const req1 = mockRequest();
        const res1 = mockResponse();
        req1.body = {
            email : "testemail2@gmail.com",
            password: "testPassword",
        }
        await signin(req1, res1);
        expect(res1.status).toHaveBeenCalledWith(401);
        expect(res1.status(401).send).toHaveBeenCalledWith("Invalid Password");
    })
});





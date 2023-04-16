const {createUser, 
    verifyUser, getUserByEmail, 
    getAllUsers, getUserByUserId, 
    updateUserType, isValidActiveUser, 
    addNewTicketCreatedByUser, addTicketAssignedToUser, 
    validateTicketId, getAllAssignedTicketsOfUser} = require('./user.service');
const User = require("../models/user.model");
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

describe('create user', ()=>{
    
    it('should return valid reponse, when valid user data is provided', ()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const createUserSpy = jest.spyOn(User, 'create').mockImplementation(()=>{
            return userData;
        })
        expect.assertions(2);
        try {
            const response = createUser(userData);
            expect(createUserSpy).toHaveBeenCalled();
            expect(response).toEqual(expect.objectContaining({user: userData}));   
        } catch (e) {
        }
    })

    it('should return error reponse, when invalid user data is provided', ()=>{
        const userData = {
            name: "testName",
            email: "testemailgmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const createUserSpy = jest.spyOn(User, 'create').mockImplementation(()=>{
            throw new Error({message:"Invalid Email"});
        })
        try {
            const response = createUser(userData);
        } catch (e) {
          expect(e).toEqual("Invalid Email");
        }
    })
})
      


const {createUser, 
    verifyUser, getUserByEmail, 
    getAllUsers, getUserByUserId, 
    updateUserType, isValidActiveUser, 
    addNewTicketCreatedByUser, addTicketAssignedToUser, 
    validateTicketId, getAllAssignedTicketsOfUser} = require('./user.service');
const User = require("../models/user.model");
const db = require('../tests/testUtils/db');
const bcrypt = require("bcrypt");

beforeAll(async() => {
    await db.connect();
});

afterAll(async() => {
    await db.closeDatabase();
});

afterEach(async() => {
    await db.clearDatabase();
     // restore the spy created with spyOn
     jest.restoreAllMocks();
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
});
      

describe('Verify user', ()=>{
    
    it('should return error, when email is not found', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return null;
        })
    
        const result = await verifyUser(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(result).toEqual(expect.objectContaining({error:"Invalid Email" }));
    });

    it('should return error, when password is not matching', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return userData;
        })
        const compareSyncSpy = jest.spyOn(bcrypt, 'compareSync').mockImplementation(()=>{
            return false;
        })

    
        const result = await verifyUser(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(compareSyncSpy).toHaveBeenCalled();
        expect(result).toEqual(expect.objectContaining({error:"Invalid Password" }));
    });

    it('should return user data, when password is matching', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return userData;
        })
        const compareSyncSpy = jest.spyOn(bcrypt, 'compareSync').mockImplementation(()=>{
            return true;
        })

    
        const result = await verifyUser(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(compareSyncSpy).toHaveBeenCalled();
        expect(result).toEqual(expect.objectContaining({success:true }));
    });

    it('should return error, when error is thrown', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            throw new Error({message:"Search failed"});
        })
       
        const compareSyncSpy = jest.spyOn(bcrypt, 'compareSync').mockImplementation(()=>{
            return true;
        })
        expect.assertions(2);
        try {
            const result = await verifyUser(userData);
            expect(findOneUserSpy).toHaveBeenCalled();
            expect(compareSyncSpy).not.toHaveBeenCalled();
        } catch (err) {
          expect(err).toEqual("Search failed");
        }
        
    });
});


describe('getUserByEmail', ()=>{
    it('should return error, when error is thrown', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            throw new Error({message:"Search failed"});
        })
        expect.assertions(1);
        try {
            const result = await getUserByEmail(userData);
            expect(findOneUserSpy).toHaveBeenCalled();
        } catch (err) {
          expect(err).toEqual("Search failed");
        }
    });

    it('should return response, when user is found by email', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return userData;
        })
        const result = await getUserByEmail(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(result).toEqual(expect.objectContaining(userData));
    });

    it('should return null response, when user is not found by email', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return null;
        })
        const result = await getUserByEmail(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(result).toEqual(null);
    
    });
});

describe('isValidActiveUser', ()=>{
    it('should return error, when user is not found by email', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return null;
        })
        const result = await isValidActiveUser(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(result).toEqual(expect.objectContaining({
            error: "invalid user"
        }));
    });

    it('should return error, when user is found by email but userStatus is not approved', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            userData.userStatus = "pending";
            return userData;
        })
        const result = await isValidActiveUser(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(result).toEqual(expect.objectContaining({
            error: "invalid user"
        }));
    });

    it('should return user data, when user is found by email and userStatus is approved', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            userData.userStatus = "approved";
            return userData;
        })
        const result = await isValidActiveUser(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(result).toEqual(expect.objectContaining({user:userData}));
    });

    it('should return error, when error is thrown', async()=>{
        const userData = {
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            throw new Error({message:"Search failed"});
        })
        expect.assertions(1);
        try {
            const result = await isValidActiveUser(userData);
            expect(findOneUserSpy).toHaveBeenCalled();
        } catch (err) {
          expect(err).toEqual("Search failed");
        }
    });
})

describe('getUserByUserId', ()=>{
    it('should return error, when error is thrown', async()=>{
        const userData = {
            id:"123",
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            throw new Error({message:"Search failed"});
        })
        expect.assertions(1);
        try {
            const result = await getUserByUserId(userData);
            expect(findOneUserSpy).toHaveBeenCalled();
        } catch (err) {
          expect(err).toEqual("Search failed");
        }
    });

    it('should return response, when user is found by email', async()=>{
        const userData = {
            id:"123",
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return userData;
        })
        const result = await getUserByUserId(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(result).toEqual(expect.objectContaining(userData));
    });

    it('should return null response, when user is not found by email', async()=>{
        const userData = {
            id:"123",
            name: "testName",
            email: "testemail@gmail.com",
            userType: "customer",
            password: "testEmail@123",
        } 
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return null;
        })
        const result = await getUserByUserId(userData);
        expect(findOneUserSpy).toHaveBeenCalled();
        expect(result).toEqual(null);
    
    });
});

describe('updateUserType', ()=>{
    it('should return error, when invalid user type is provided', async()=>{
        const userData ={ 
                updates:{
                id:"123",
                name: "testName",
                email: "testemail@gmail.com",
                password: "testEmail@123",
                userType: "doctor"
            } 
        }
        const result = await updateUserType(userData);
        expect(result).toEqual(expect.objectContaining({error: "invalid user type provided"}));
    });

    it('should call findOne with userId, when userId is provided in user data', async()=>{
        const userData ={ 
                userId:"123",
                updates:{
                    id:"123",
                    name: "testName",
                    email: "testemail@gmail.com",
                    userType: "customer",
                    password: "testEmail@123",
                } 
            }
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return;
        })
        const findOneAndUpdateSpy = jest.spyOn(User, 'findOneAndUpdate').mockImplementation(()=>{
            return;
        })
        const result = await updateUserType(userData);
        expect(findOneAndUpdateSpy).toHaveBeenCalledWith({_id:userData.userId}, {userType: userData.updates.userType})
        expect(findOneUserSpy).toHaveBeenCalledWith({_id:userData.userId})
    });

    it('should call findOne with email id, when email id is provided in user data', async()=>{
        const userData ={ 
            email: "testemail@gmail.com",
            updates:{
                id:"123",
                name: "testName",
                email: "testemail@gmail.com",
                userType: "customer",
                password: "testEmail@123",
            } 
        }
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return;
        })
        const findOneAndUpdateSpy = jest.spyOn(User, 'findOneAndUpdate').mockImplementation(()=>{
            return;
        })
        const result = await updateUserType(userData);
        expect(findOneAndUpdateSpy).toHaveBeenCalledWith({email:userData.email}, {userType: userData.updates.userType})
        expect(findOneUserSpy).toHaveBeenCalledWith({email:userData.email})

    });

    it('should return error, when email id and userId both are not provided in user data', async()=>{
        const userData ={ 
            updates:{
                id:"123",
                name: "testName",
                email: "testemail@gmail.com",
                userType: "customer",
                password: "testEmail@123",
            } 
        }
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return;
        })
        const findOneAndUpdateSpy = jest.spyOn(User, 'findOneAndUpdate').mockImplementation(()=>{
            return;
        })
        const result = await updateUserType(userData);
        expect(findOneAndUpdateSpy).not.toHaveBeenCalled()
        expect(result).toEqual(expect.objectContaining({
            error: "required fields are not provided to update the user information",
        }))

    });

    it('should return the error, when error is thrown',async ()=>{
        const userData ={ 
            email: "testemail@gmail.com",
            updates:{
                id:"123",
                name: "testName",
                email: "testemail@gmail.com",
                userType: "customer",
                password: "testEmail@123",
            } 
        }
        const findOneUserSpy = jest.spyOn(User, 'findOne').mockImplementation(()=>{
            throw new Error({message:"Search failed"});
        })
        const findOneAndUpdateSpy = jest.spyOn(User, 'findOneAndUpdate').mockImplementation(()=>{
            return;
        })
        expect.assertions(2);
        try {
            const result = await updateUserType(userData);
            expect(findOneUserSpy).toHaveBeenCalled();
            expect(findOneAndUpdateSpy).toHaveBeenCalled()
        } catch (err) {
          expect(err).toEqual("Search failed");
        }
    });
});

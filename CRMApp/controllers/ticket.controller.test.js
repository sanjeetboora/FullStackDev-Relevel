const {mockRequest, mockResponse} = require('../tests/testUtils/interceptor');
const {createTicket, getOneTicket,
    getAllTicktes, getAllTicketsByStatus,
     getMyAllAssignedTickets, updateTicketById} = require('./ticket.controller');
const db = require('../tests/testUtils/db');
const ticketService = require('../services/ticket.service');

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe('create ticket', ()=>{
    it('should create a ticket with valid response from create ticket', async()=>{
        const createTicketServiceSpy = 
        jest.spyOn(ticketService, 'createTicket').mockImplementation(
            () => {
                return {title: "This is a real ticket",
                description: "This is the real ticket description",
                assignedTo:"bhaweshg0777@gmail.com",
                clientName: "adobe"}
            }
        );
        const req = mockRequest();
        const res = mockResponse();
        await createTicket(req, res);
        expect(createTicketServiceSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.status(201).send).toHaveBeenCalledWith({
            title: "This is a real ticket",
            description: "This is the real ticket description",
            assignedTo:"bhaweshg0777@gmail.com",
            clientName: "adobe"
        });
    });

    it('should not create a ticket with invalid data', async()=>{
        const createTicketServiceSpy = 
        jest.spyOn(ticketService, 'createTicket').mockImplementation(
            () => {
                return {error: "This is test error"}
            }
        );
        const req = mockRequest();
        const res = mockResponse();
        await createTicket(req, res);
        expect(createTicketServiceSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.status(401).send).toHaveBeenCalledWith("This is test error");
    });
});

describe('getOne ticket', ()=>{
    it('should get a ticket with valid response from getOneTicket', async()=>{
        const getOneTicketServiceSpy = 
        jest.spyOn(ticketService, 'getOneTicket').mockImplementation(
            () => {
                return {title: "This is a real ticket",
                description: "This is the real ticket description",
                assignedTo:"bhaweshg0777@gmail.com",
                clientName: "adobe"}
            }
        );
        const req = mockRequest();
        const res = mockResponse();
        await getOneTicket(req, res);
        expect(getOneTicketServiceSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.status(201).send).toHaveBeenCalledWith({
            title: "This is a real ticket",
            description: "This is the real ticket description",
            assignedTo:"bhaweshg0777@gmail.com",
            clientName: "adobe"
        });
    });

    it('should not get a ticket with invalid data', async()=>{
        const getOneTicketServiceSpy = 
        jest.spyOn(ticketService, 'getOneTicket').mockImplementation(
            () => {
                return {error: "This is test error"}
            }
        );
        const req = mockRequest();
        const res = mockResponse();
        await getOneTicket(req, res);
        expect(getOneTicketServiceSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.status(401).send).toHaveBeenCalledWith("This is test error");
    });
});
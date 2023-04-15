const mockRequest = () => {
    const req = {};
    req.body = {};
    req.params = {};
    return req;
}


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue({send: jest.fn().mockReturnValue({})});
    res.send = jest.fn().mockReturnValue({});
    return res;
}


module.exports = {mockRequest, mockResponse};
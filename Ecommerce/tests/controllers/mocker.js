function mockRequest(){
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    req.query = jest.fn().mockReturnValue(req);
    return req;
}

function mockResponse(){
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    return res;
}


module.exports = {mockRequest, mockResponse};
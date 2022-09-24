const categoryController = require('../../controllers/category.controller');
const categoryService = require('../../services/category.service');
const {mockRequest, mockResponse} = require('./mocker');

const allCategoriesResponse = [
    {
        id: 1,
        name: 'Electronics'
    },
    {
        id: 2,
        name: 'Groceries'
    },
];

test('when getCategories is called, it should return all the categories', async()=>{
    const spy = jest.spyOn(categoryService, 'getAllCategories').mockReturnValue(allCategoriesResponse);
    const req = mockRequest();
    const res = mockResponse();
    const result = await categoryController.getCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(result.json).toHaveBeenCalled();
    expect(result.json).toHaveBeenCalledWith({
        message: 'Successfully fetched the categories',
        success: true,
        code: 200,
        data: allCategoriesResponse
    
    });
}); 
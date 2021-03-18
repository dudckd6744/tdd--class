const productController = require("../../controller/products");
const ProductModel = require("../../models/Product");
// const jest = require("jest");

ProductModel.create = jest.fn();

describe("Product Controller Create", ()=>{
    it("should have a createProduct Function",()=>{
        expect(typeof productController.createProduct).toBe("function")
    })

    it("should call ProductModel.create",()=>{
        productController.createProduct();
        expect(ProductModel.create).toBeCalled();
    })
})

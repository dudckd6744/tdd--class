const productController = require("../../controller/products");
const ProductModel = require("../../models/Product");
const httpMocks =  require("node-mocks-http");
const newProduct = require("../data/new-product.json")
const allProducts = require("../data/all-products.json");
const Product = require("../../models/Product");

// const jest = require("jest");

ProductModel.create = jest.fn();
ProductModel.find = jest.fn();
ProductModel.findById = jest.fn();
ProductModel.findByIdAndUpdate = jest.fn();

const productId = "dd"
const updateproduct = {name:"update name", description:"updatea des"}
let req,res,next;

beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("Product Controller Create", ()=>{

    beforeEach(()=>{
        req.body = newProduct;
    })

    it("should have a createProduct Function",()=>{
        expect(typeof productController.createProduct).toBe("function")
    })

    it("should call ProductModel.create",async ()=>{
        
        await productController.createProduct(req, res, next);
        expect(ProductModel.create).toBeCalledWith(newProduct);
    })

    it("should return 201 response code",async ()=>{
        await productController.createProduct(req,res,next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy(); 
    })

    it("should return json body in response",async ()=>{
        ProductModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req,res,next);
        expect(res._getJSONData()).toStrictEqual(newProduct)
    })

    it("should handle errors",async () => {
        const errorMessage = { message: "descritipn property missing"};
        const rejectedPromise = Promise.reject(errorMessage);
        ProductModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req,res,next);
        expect(next).toBeCalledWith(errorMessage);
    })
})

describe("Product Controller Get", ()=>{
    it("should have a getProducts function",() =>{
        expect(typeof productController.getProducts).toBe("function")
    })
    it("should call ProductModel.find({})", async ()=>{
        await productController.getProducts(req,res,next);
        expect(ProductModel.find).toHaveBeenCalledWith({})
    })
    it("should return 200 response", async ()=>{
        await productController.getProducts(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should return json body in response", async ()=>{
        ProductModel.find.mockReturnValue(allProducts);
        await productController.getProducts(req,res,next);
        expect(res._getJSONData()).toStrictEqual(allProducts)
    })
    it("should handle errors", async ()=>{
        const errorMessage = {message:"error finding product data"}
        const rejectedPromise = Promise.reject(errorMessage)
        ProductModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })  
})

describe("Product Controller GetById", ()=>{
    it("should have a getProductById", ()=>{
        expect(typeof productController.getProductById).toBe("function")
    })
    it("should call productMode.findById", async ()=>{
        req.params.productId = productId;
        await productController.getProductById(req,res,next);
        expect(ProductModel.findById).toBeCalledWith(productId)
    })
    it("should return json body response code 200", async ()=>{
        ProductModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should return 404 when item doesnt exist", async ()=>{
        ProductModel.findById.mockReturnValue(null)
        await productController.getProductById(req,res,next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should handle error", async ()=>{
        const errorMessage = {message: "error"}
        const rejectedPromise = Promise.reject(errorMessage)
        ProductModel.findById.mockReturnValue(rejectedPromise)
        await productController.getProductById(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe("Product Controller Update", ()=>{
    it("should have an updataProduct function", ()=>{
        expect(typeof productController.updateProduct).toBe("function")
    })
    it("should call productMode.findByIDAndUpdate", async ()=>{
        req.params.productId = productId
        req.body = updateproduct
        await productController.updateProduct(req,res,next);
        expect(ProductModel.findByIdAndUpdate).toHaveBeenCalledWith(
            productId, updateproduct,
            {new : true}
        )
    })
    it("should return json body and response code 200", async ()=>{
        req.params.productId = productId
        req.body = updateproduct
        ProductModel.findByIdAndUpdate.mockReturnValue(updateproduct)
        await productController.updateProduct(req,res,next);
        expect(res._isEndCalled()).toBeTruthy()
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updateproduct)
    })
    it("should handle 404 when item doesnt exist", async ()=>{
        ProductModel.findByIdAndUpdate.mockReturnValue(null);
        await productController.updateProduct(req,res,next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should handle errors", async ()=>{
        const errorMessage = {message:"Error"}
        const reJectPromis = Promise.reject(errorMessage)
        ProductModel.findByIdAndUpdate.mockReturnValue(reJectPromis)
        await productController.updateProduct(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})
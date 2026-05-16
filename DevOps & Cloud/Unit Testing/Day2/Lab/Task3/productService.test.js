const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const productService = require('./productService');
const Product = require('./Product');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Product.deleteMany({});
});

describe('productService', () => {
  describe('createProduct validation', () => {
    it('should create a product successfully (happy path)', async () => {
      // setup
      const productData = {
        name: 'Test Product',
        slug: 'test-product',
        price: 100
      };

      // exercise
      const result = await productService.createProduct(productData);

      // verify
      expect(result.name).toBe(productData.name);
      expect(result.slug).toBe(productData.slug);
      expect(result.inStock).toBe(true);
    });

    it('should throw error if slug already exists', async () => {
      // setup
      const productData = {
        name: 'Test Product',
        slug: 'test-product',
        price: 100
      };
      await Product.create(productData);

      // exercise & verify
      await expect(productService.createProduct(productData)).rejects.toThrow(
        'Slug already in use'
      );
    });

    it('should throw validation error for negative price', async () => {
      // setup
      const productData = {
        name: 'Bad Product',
        slug: 'bad-product',
        price: -10
      };

      // exercise & verify
      await expect(productService.createProduct(productData)).rejects.toThrow(
        /min/
      );
    });
  });

  describe('getAvailableProducts validation', () => {
    it('should return only products where inStock is true', async () => {
      // setup
      await Product.create([
        {name: 'P1', slug: 'p1', price: 10, inStock: true},
        {name: 'P2', slug: 'p2', price: 20, inStock: false},
        {name: 'P3', slug: 'p3', price: 30, inStock: true}
      ]);

      // exercise
      const result = await productService.getAvailableProducts();

      // verify
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.inStock)).toBe(true);
    });
  });

  describe('discontinue validation (bonus)', () => {
    it('should set inStock to false and return updated product', async () => {
      // setup
      const slug = 'test-product';
      await Product.create({name: 'Test', slug, price: 10, inStock: true});

      // exercise
      const result = await productService.discontinue(slug);

      // verify
      expect(result.inStock).toBe(false);
      const updated = await Product.findOne({slug});
      expect(updated.inStock).toBe(false);
    });

    it('should throw "Product not found" for unknown slug', async () => {
      // setup
      const slug = 'unknown-slug';

      // exercise & verify
      await expect(productService.discontinue(slug)).rejects.toThrow(
        'Product not found'
      );
    });
  });
});

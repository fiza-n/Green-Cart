import test from 'node:test';
import assert from 'node:assert/strict';
import { mock } from 'node:test';

import Product from '../models/product.js';
import { addProduct } from '../controllers/productController.js';
import { v2 as cloudinary } from 'cloudinary';

const makeRes = () => ({
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.payload = payload;
    return this;
  },
});

test('addProduct handles missing uploaded files and parsed product JSON', async () => {
  const uploadMock = mock.method(cloudinary.uploader, 'upload').mockImplementation(async () => ({ secure_url: 'https://cdn.test/image.jpg' }));
  const createMock = mock.method(Product, 'create').mockImplementation(async (payload) => payload);

  const req = {
    body: {
      productData: JSON.stringify({
        name: 'Test Product',
        description: 'Nice product',
        price: 99,
        offerPrice: 79,
        inStock: true,
        category: 'Fresh'
      })
    },
    files: undefined
  };

  const res = makeRes();

  const result = await addProduct(req, res);

  assert.equal(result?.statusCode, 201);
  assert.equal(res.payload.success, true);
  assert.equal(createMock.mock.calls.length, 1);
  assert.deepEqual(createMock.mock.calls[0].arguments[0].images, ['https://cdn.test/image.jpg']);

  uploadMock.mock.restore();
  createMock.mock.restore();
});

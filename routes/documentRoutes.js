const express = require('express');
const documentController = require('./../controllers/documentCotroller');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(documentController.getAllDocs)
  .post(documentController.createDocs);

router
  .route('/:id')
  .get(documentController.getDocs)
  .patch(documentController.updateDocs)
  .delete(documentController.deleteDocs);

module.exports = router;

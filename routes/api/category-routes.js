const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');

// The `/api/categories` endpoint


// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  try {
    Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    }).then((response) => res.json(response))

  } catch (err) {
    res.status(400).json(err);

  }
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name : req.body.category_name,
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err)
  }
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
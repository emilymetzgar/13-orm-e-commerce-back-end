const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = Tag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    Tag.findOne({
        where: {
          id: req.params.id
        },
        include: [{model:Product}]
      }).then((response) => res.json(response))
  
    } catch (err) {
      res.status(400).json(err);
  
    }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const createTagData = Tag.create({
      tag_name : req.body.tag_name,
    });
    res.status(200).json(createTagData);
  } catch (err) {
    res.status(400).json(err)
  }
});
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = Tag.findByPk(req.params.id);
    updateTag.tag_name = req.body.tag_name;
    updateTag.save()
    res.status(200).json(updateTagData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = Tag.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deleteTag) {
      res.status(400).json({ message: "No tag by this ID"})
      return;
    }

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

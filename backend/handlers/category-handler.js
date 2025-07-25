const Category = require("./../db/category");

async function addCategory(model) {
    let category = new Category({
        name: model.name,
    });
    await category.save();
    return category.toObject();
}

async function getCategories() {
    let categories = await Category.find();
    return categories.map((c) => c.toObject());
}

async function updateCategory(id, model) {
    await Category.findOneAndUpdate({ _id: id }, model);
    return;
}

async function deleteCategory(id) {
    await Category.findByIdAndDelete(id);
    return;
}

async function getCategoryById(id) {
    let categories = await Category.findById(id);
    return categories.toObject();
}

module.exports = { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById };
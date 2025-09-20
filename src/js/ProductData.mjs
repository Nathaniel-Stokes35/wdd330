const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) return res.json();
  throw new Error('Bad Response');
}

export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async getData(category = this.category) {
    if (!category || category === 'null' || category === 'undefined') {
      category = null;
    }
    console.log(category);
    const categoriesToFetch = category
      ? Array.isArray(category)
        ? category
        : [category]
      : ['backpacks', 'sleeping-bags', 'tents', 'hammocks'];
    console.log(categoriesToFetch);
    const results = [];

    // fetch each category sequentially
    for (const cat of categoriesToFetch) {
      console.log(cat);
      const response = await fetch(`${baseURL}products/search/${cat}`);
      const data = await convertToJson(response);
      results.push(...data.Result);
    }
    console.log(results);
    return results;
  }

  async findProductById(id) {
    const products = await this.getData();
    console.log(products);
    return products.find(item => item.Id === id);
  }
}
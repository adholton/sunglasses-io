let brandsArray = [
  {
      "id": "1",
      "name" : "Oakley"
  },
  {
      "id": "2",
      "name" : "Ray Ban"
  },
  {
      "id": "3",
      "name" : "Levi's"
  },
  {
      "id": "4",
      "name" : "DKNY"
  },
  {
      "id": "5",
      "name" : "Burberry"
  }
]

class Brands {
  constructor(params) {
    Object.assign(this, params);
  }

  static getAllBrands() {
    return brandsArray;
  } 

  static removeAll() {
    brandsArray = [];
  }

  static getIdOfSearchedBrand(queryString) {
    const query = queryString.toLowerCase();
    let brandId;
    brandsArray.forEach(brand => {
      if (brand.name.toLowerCase().includes(query)) {
        brandId = brand.id
      }
    })
    return brandId;
  }
}

module.exports = Brands;


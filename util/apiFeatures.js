class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`),
    );
    this.query = this.query.find(queryStr);

    return this;
  }

  sorting() {
    let sortBy = this.queryString.sort;
    if (sortBy) {
      //because we need to pass space seperated values
      sortBy = sortBy.split(',').join(' ');
    } else {
      sortBy = '-createdAt';
    }
    this.query.sort(sortBy);
    return this;
  }

  limitField() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;

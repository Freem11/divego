export class DynamicSelectOptions {
  convertItem(item) {
    return item;
  }

  convertItems(items) {
    const result = { options: [], totalCount: 0 };
    if (items?.length) {
      result.options = items.filter(item => !!item).map(item => this.convertItem(item));
      result.totalCount = result.options.length;
    }
    return result;
  }

  convertHttpResponse(response) {
    const result = { options: [], totalCount: 0 };

    if (response?.length === 0) {
      return result;
    }

    result.options = response.map(item => this.convertItem(item));

    const headers = response.headers;
    if (headers?.hasOwnProperty('x-total-count')) {
      result.totalCount = parseInt(response.headers['x-total-count']);
    } else {
      result.totalCount = null;
    }

    return result;
  }
}

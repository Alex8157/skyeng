export class PostService {
  static async getData({ name, page, sort = true }) {
    const response = await fetch(
      `https://api.github.com/search/users?q=${name}&sort=repositories&order=${
        sort ? "desc" : "asc"
      }&per_page=30&page=${page}`
    ).then((response) => response.json());
    return response;
  }
}

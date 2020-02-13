const blogUrl = "http://localhost:3000";

const API = {
  getBlogEntries() {
    return fetch(`${blogUrl}/interests?_expand=place`).then(response => response.json());
  },
  addBlogEntry(entry) {
    return fetch(`${blogUrl}/interests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    });
  },
  deleteBlogEntry(entryId) {
    return fetch(`${blogUrl}/interests/${entryId}`, {
      method: "DELETE"
    });
  },
  editBlogEntry(entry) {
    return fetch(`${blogUrl}/interests/${entry.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    });
  }
};

export default API;
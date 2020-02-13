const createBlogEntry = entry =>
  `
    <div class="container">
        <h1>${entry.place.name}</h1>
        <h3>${entry.name}</h3>
        <p>Description: ${entry.description}<br>Cost: $${entry.cost}</p>
        <span id="span--${entry.id}"> Review: ${entry.review}</span><br>
        <button id="deleteBtn--${entry.id}">Delete</button>
        <button id="editBtn--${entry.id}">Edit</button>
    </div><hr/>
`;

export default createBlogEntry;

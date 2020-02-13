import createBlogEntry from "/scripts/entryComponent.js"
const blogContainer = document.querySelector("#blogContainer");
/*
    Purpose: To render all blog entries to the DOM

    Arguments: entries (array of objects)
*/
const renderBlogEntries = entries => {
    blogContainer.textContent = ""

    for(const entry of entries) {
        
        const entryCard = createBlogEntry(entry)
        blogContainer.innerHTML += entryCard
        if (entry.review == ""){
            document.getElementById(`span--${entry.id}`).style = "display:none"
        } else {
            document.getElementById(`span--${entry.id}`).style = ""
        }
    }
}

export default renderBlogEntries
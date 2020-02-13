import eventManager from "/scripts/blogEvents.js"
import API from "./data.js"
import renderBlogEntries from "./entriesDom.js"


eventManager.addBlogEntryEventListener()
eventManager.blogDeleteEventListener()
API.getBlogEntries().then(renderBlogEntries)

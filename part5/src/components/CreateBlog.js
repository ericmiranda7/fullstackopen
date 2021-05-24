import React from 'react'

const CreateBlog = ({ handleCreation, blogTitle, setTitle, blogAuthor, setAuthor, blogUrl, setUrl }) => (
  <div>
    <form onSubmit={handleCreation}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={blogTitle}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          name="author"
          value={blogAuthor}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="url"
          name="url"
          value={blogUrl}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
)

export default CreateBlog
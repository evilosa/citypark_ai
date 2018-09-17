const blog = {
  title: '',
  body: '',
  description: '',
  blobImageAttributes: [],
  blobGalleriesAttributes: []
}

export const createBlogs = props => ({
  ...blog,
  ...props
})

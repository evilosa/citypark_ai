const blog = {
  title: '',
  body: '',
  description: '',
  blobImageAttributes: [],
  blobGalleriesAttributes: []
}

export const createWithProps = props => ({
  ...blog,
  ...props
})

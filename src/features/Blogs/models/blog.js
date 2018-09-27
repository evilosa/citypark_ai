const blog = {
  title: '',
  body: '',
  description: '',
  hidden: false,
  blobImageAttributes: [],
  blobGalleriesAttributes: []
}

export const createWithProps = props => ({
  ...blog,
  ...props
})

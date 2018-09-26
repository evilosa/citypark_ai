const news = {
  title: '',
  body: '',
  description: '',
  blobImageAttributes: [],
  blobGalleriesAttributes: []
}

export const createWithProps = props => ({
  ...news,
  ...props
})

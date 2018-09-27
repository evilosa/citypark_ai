const news = {
  title: '',
  body: '',
  description: '',
  hidden: false,
  blobImageAttributes: [],
  blobGalleriesAttributes: []
}

export const createWithProps = props => ({
  ...news,
  ...props
})

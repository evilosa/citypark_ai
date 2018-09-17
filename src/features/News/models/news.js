const news = {
  title: '',
  body: '',
  description: '',
  blobImageAttributes: [],
  blobGalleriesAttributes: []
}

export const createNews = props => ({
  ...news,
  ...props
})

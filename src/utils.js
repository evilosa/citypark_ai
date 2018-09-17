export const base64Loader = files => new Promise((resolve, reject) => {
  var result = []
  var pending = 0
  if (files && files.length) files.forEach(file => {
    let reader = new FileReader()
    ++pending
    reader.readAsDataURL(file)
    reader.onload = () => {
      result.push({ image: reader.result })
      --pending
      if (!pending) resolve(result)
    }
    reader.onerror = () => reject()
  })
  if (!pending) resolve()
})

export const toPayload = (state, payload) => ({
  ...state,
  fetching: null,
  payload
})

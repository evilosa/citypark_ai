import uuid from 'uuid'
import numeral from 'numeral'


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

export const groupBy = (sourceTable, mainKey, groupFields, totalFields) => {
  const [key, ...tail] = groupFields;
  let result = sourceTable.reduce(
    (accum, currentRow) => {
      const existingValues = accum.filter(accumValue => accumValue[mainKey] === currentRow[key]);
      if (existingValues.length === 0) { // такого элемента нет: добавим его в результат
        
        const newGroupItem = {
          key: uuid.v1(),
          [mainKey]: currentRow[key],
          children: [currentRow],
        }
        totalFields.forEach(fieldKey => {
          newGroupItem[fieldKey] = currentRow[fieldKey]
        })
        accum.push(newGroupItem)

      } else { // такой элемент уже есть в результате
        const groupItem = existingValues[0];
        groupItem.children.push(currentRow);
        totalFields.forEach(fieldKey => {
          groupItem[fieldKey] = groupItem[fieldKey] + currentRow[fieldKey]
        })
      }
      
      return accum
    }
    ,[])

  // мы сгруппировали таблицу по первому ключу, поручим детям сгруппировать свои строки
  if (tail.length > 0) {
    result = result.map(groupedItem => {
      groupedItem.children = groupBy(groupedItem.children, mainKey, tail, totalFields);

      totalFields.forEach(fieldKey => {
        groupedItem[fieldKey] = numeral(groupedItem[fieldKey]).format()
      })
      return groupedItem;
    })
  } else if (tail.length === 0) {
    result = result.map(groupedItem => {

      groupedItem.children = groupedItem.children.map(lowestRow => {
        totalFields.forEach(fieldKey => {
          lowestRow[fieldKey] = numeral(lowestRow[fieldKey]).format()
        })
        return lowestRow;
      })

      totalFields.forEach(fieldKey => {
        groupedItem[fieldKey] = numeral(groupedItem[fieldKey]).format()
      })
      return groupedItem;
    })
  }

  return result
}

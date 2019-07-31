const fakeData = [
  {
    number: 1,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 2,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 3,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 4,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 5,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 6,
    organization: 'ООО "Мельница"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 7,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 8,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 9,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 10,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 11,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 12,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  },
  {
    number: 13,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: 1,
    sum: 300
  },
  {
    number: 14,
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: 1,
    sum: 1400
  }
]

const groupBy = (sourceTable, groupFields, totalFields) => {
  const [key, ...tail] = groupFields;
  let result = sourceTable.reduce(
    (accum, currentRow) => {
      const existingValues = accum.filter(accumValue => accumValue.name === currentRow[key]);
      if (existingValues.length === 0) { // такого элемента нет: добавим его в результат
        
        const newGroupItem = {
          name: currentRow[key],
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
      groupedItem.children = groupBy(groupedItem.children, tail, totalFields);
      return groupedItem;
    })
  }
  
  return result
}

const result = groupBy(fakeData, ['organization', 'restaurantСomplex', 'hall', 'placeOfPreparation'], ['sum', 'count'])

const fakeResult = [
  {
    name: 'OOO Olimp',
    children: [

    ],
    sum: 1000,
    count: 1
  },
  {
    name: 'OOO Melnica',
    children: [

    ],
    sum: 1000,
    count: 2
  }
]
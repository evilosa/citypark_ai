const fakeData = [
  {
    number: '1',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: '1',
    sum: '1400'
  },
  {
    number: '2',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: '1',
    sum: '1400'
  },
  {
    number: '3',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: '1',
    sum: '300'
  },
  {
    number: '4',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: '1',
    sum: '1400'
  },
  {
    number: '5',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: '1',
    sum: '1400'
  },
  {
    number: '6',
    organization: 'ООО "Мельница"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: '1',
    sum: '300'
  },
  {
    number: '7',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: '1',
    sum: '1400'
  },
  {
    number: '8',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: '1',
    sum: '300'
  },
  {
    number: '9',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: '1',
    sum: '1400'
  },
  {
    number: '10',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: '1',
    sum: '300'
  },
  {
    number: '11',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: '1',
    sum: '1400'
  },
  {
    number: '12',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: '1',
    sum: '1400'
  },
  {
    number: '13',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Ресторан',
    placeOfPreparation: 'Кухня',
    name: 'Суп Поло',
    unit: 'Порция',
    count: '1',
    sum: '300'
  },
  {
    number: '14',
    organization: 'ООО "Олимп"',
    restaurantСomplex: '"Сити Парк"',
    hall: 'Летнее кафе',
    placeOfPreparation: 'Шашлычная',
    name: 'Шашлык',
    unit: 'Кг',
    count: '1',
    sum: '1400'
  }
]

const findUnics = (sourseTable, key) => {
  let i=0
  const result = sourseTable.reduce((accum, currentRow) => {
    i++
    const organizationRows = accum.filter(accumRow => {
      return accumRow.name === currentRow[key]
    })
    if (organizationRows.length === 0) {
      accum.push({name: currentRow[key], children: [currentRow]})
    } else {
      organizationRows[0].children.push(currentRow)
    }
    return accum
  }, [])
  return result
}

const organisations = findUnics(fakeData, 'organization')

const nextLevel = organisations.map(organisation => {
  halls = findUnics(organisation.children, 'hall')


  organisation.children = halls;
  return organisation
})




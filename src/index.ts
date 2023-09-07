export default function convertJapaneseDateToISO8601(dateStr: string) {
  // 文字列がない場合は空文字を返す
  if (!dateStr) {
    return ''
  }
  // 西暦の場合
  const adDateRegex = /(\d+)年(\d+)?月?(\d+)?日?/
  const adMatch = convertToHalfWidth(dateStr).match(adDateRegex)
  if (adMatch && adMatch.length === 4 && adMatch[1].length === 4) {
    const year = parseInt(adMatch[1])
    const month = adMatch[2] ? parseInt(adMatch[2].replace(/^0+/, '')) : 1
    const day = adMatch[3] ? parseInt(adMatch[3].replace(/^0+/, '')) : 1
    return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  }
  // 和暦の場合
  const eraDateRegex = /([明治大正昭和平成令和]+)(元|\d+)年(\d+)?月?(\d+)?日?/
  const eraMatch = convertToHalfWidth(dateStr).match(eraDateRegex)
  if (!eraMatch || eraMatch.length < 4) {
    throw new Error('convert-japanese-date: Invalid Japanese date format.')
  }
  const era = eraMatch[1]
  const year = eraMatch[2] === '元' ? 1 : parseInt(eraMatch[2].replace(/^0+/, ''))
  let month = eraMatch[3] ? parseInt(eraMatch[3].replace(/^0+/, '')) : 1
  let day = eraMatch[4] ? parseInt(eraMatch[4].replace(/^0+/, '')) : 1

  let eraStartYear = 0
  switch (era) {
    case '明治':
      eraStartYear = 1868
      break
    case '大正':
      eraStartYear = 1912
      break
    case '昭和':
      eraStartYear = 1926
      break
    case '平成':
      eraStartYear = 1989
      break
    case '令和':
      eraStartYear = 2019
      break
    default:
      throw new Error('convert-japanese-date: Unsupported era.')
  }

  const isFirstEraAndEmptyMonth = year === 1 && month === 1
  if (isFirstEraAndEmptyMonth) {
    switch (era) {
      case '明治':
        month = 1
        day = 1
        break
      case '大正':
        month = 7
        day = 30
        break
      case '昭和':
        month = 12
        day = 25
        break
      case '平成':
        month = 1
        day = 8
        break
      case '令和':
        month = 5
        day = 1
        break
      default:
        throw new Error('convert-japanese-date: Unsupported era.')
    }
  }

  const yearInAD = eraStartYear + year - 1
  return `${yearInAD.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

function convertToHalfWidth(str: string): string {
  return str.replace(/[０-９]/g, (char) => {
    const fullWidth = '０１２３４５６７８９'
    const halfWidth = '0123456789'
    const index = fullWidth.indexOf(char)
    return index !== -1 ? halfWidth[index] : char
  })
}

import convert from '../src/index'

describe('0 padding', () => {
  test('令和5年5月5日', () => {
    expect(convert('令和5年5月5日')).toBe('2023-05-05')
  })
  test('令和05年5月5日', () => {
    expect(convert('令和05年5月5日')).toBe('2023-05-05')
  })
  test('令和5年05月5日', () => {
    expect(convert('令和5年05月5日')).toBe('2023-05-05')
  })
  test('令和5年5月05日', () => {
    expect(convert('令和5年5月05日')).toBe('2023-05-05')
  })
  test('令和05年05月05日', () => {
    expect(convert('令和05年05月05日')).toBe('2023-05-05')
  })
})

describe('first era', () => {
  test('明治元年', () => {
    expect(convert('明治元年')).toBe('1868-01-01')
    expect(convert('明治1年')).toBe('1868-01-01')
  })
  test('大正元年', () => {
    expect(convert('大正元年')).toBe('1912-07-30')
    expect(convert('大正1年')).toBe('1912-07-30')
  })
  test('昭和元年', () => {
    expect(convert('昭和元年')).toBe('1926-12-25')
    expect(convert('昭和1年')).toBe('1926-12-25')
  })
  test('平成元年', () => {
    expect(convert('平成元年')).toBe('1989-01-08')
    expect(convert('平成1年')).toBe('1989-01-08')
  })
  test('令和元年', () => {
    expect(convert('令和元年')).toBe('2019-05-01')
    expect(convert('令和1年')).toBe('2019-05-01')
  })
})

describe('western year', () => {
  test('2023年', () => {
    expect(convert('2023年')).toBe('2023-01-01')
  })
  test('2023年5月', () => {
    expect(convert('2023年5月')).toBe('2023-05-01')
  })
  test('2023年5月5日', () => {
    expect(convert('2023年5月5日')).toBe('2023-05-05')
  })
})

describe('full-width number', () => {
  test('２０２３年５月５日', () => {
    expect(convert('２０２３年５月５日')).toBe('2023-05-05')
  })
  test('令和５年５月５日', () => {
    expect(convert('令和５年５月５日')).toBe('2023-05-05')
  })
})

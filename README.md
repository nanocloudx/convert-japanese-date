# convert-japanese-date

Convert Japanese date to ISO8601

## feature

Compatible with the following cases

- Japanese era year (ex: 令和5年)
- Western year (ex: 2023年)
- 0 padding (ex: 令和05年)
- full-width digit (ex: 令和０５年)
- Notation of "元年" (ex: 令和元年)

## usage

```
import convertJapaneseDate from 'convert-japanese-date'

convertJapaneseDate('平成2年8月') // '1990-08-01'
convertJapaneseDate('令和元年１２月') // '2019-12-01'
convertJapaneseDate('2023年12月31日') // '2023-12-31'
```

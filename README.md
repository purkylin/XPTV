## Supported JS functions

```javascript

// alert
alert("Hello World")

// log
console.log("Hi")
console.log("Hi", "Tom")

// cache
const v = $cache.get('key')
$cache.set('key', 'value')
$cache.del('key')

// network， default method for post: x-www-form-urlencoded
const { data } = $fetch.get('http://xx.com', {headers: {}})
const { data } = await $fetch.post('http://xx.com', {name: 'xx'}, {headers: {}})

// json parse
const $config = argsify($config_str)

// parse html
const cheerio = createCheerio()

// crypto
const CryptoJS = createCryptoJS()

// toast
native_toast("Comming")

```

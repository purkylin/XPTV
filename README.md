## 支持的JS函数

```javascript

// alert
alert("Hello World")

// log with parameters
console.log("Hi")
console.log("Hi", "Tom")
console.log("Hi", {name: "Tom"})

// cache
const v = $cache.get('key')
$cache.set('key', 'value')
$cache.del('key')

// network
const params = new URLSearchParams({
    wd: "tom",
    page: "1",
    size: "10",
});
// get with query
const { payload } = $fetch.get(`http://xx.com?${params.toString()}`, {headers: {}})
// default method for post: x-www-form-urlencoded
const { payload } = await $fetch.post('http://xx.com', {name: 'xx'}, {headers: {}})
// custom method for post: application/json
const { payload } = await $fetch.post('http://xx.com', {name: 'xx'}, {headers: {'Content-Type': 'application/json'}})

// parse html
const cheerio = createCheerio()
const $ = cheerio.load(data)
const script = $('#flarum-json-payload').text()

// crypto
const CryptoJS = createCryptoJS()

// toast
$utils.toast("This is a toast")

// open safari
$utils.openSafari("https://www.google.com", 'custom User-Agent')

// json
let obj = {name: 'xx'}
let str = JSON.stringify(obj) // alias: jsonify
let obj2 = JSON.parse(str) // alias: argsify

// config
const $config = JSON.parse($config_str)

// cookie, only for pan plugins, auto select cookie from your configs
const cookie = $cookie

// sleep, unit: second
await $sleep(0.2)
```

## 插件格式
```json
[
    {
        "id": "vod",
        "name": "CMS",
        "desc": "VOD",
        "type": "vod",
        "cache": 21600,
        "author": "purkylin",
        "version": "0.0.2",
        "icon": null,
        "update_time": "2025-03-29T16:37:00Z",
        "rules": [
            "https://pan.quark.cn/.*"
        ],
        "endpoint": "https://example.com/"
    },
]
```
目前支持三种插件，`type`可取的值为`vod`, `pan`, `yt-dlp`，`rules`是可选的，`rules`用于匹配url，`endpoint`是插件的地址。在你的插件定义中，需要保证`id`是唯一的。

## 支持的插件

* vod插件

插件定义中的`endpoint`指向的文件格式如下:
```json
{
    "sites": [
        {
            "name": "MISSAV", 
            "type": 3, 
            "api": "csp_miss",
            "icon": "https://example.com/icon.png",
            "color": "#FF0000",
            "ext": "https://example.com/test.js"
        },
    ]
}
```
其中`icon`和`color`是可选的，`icon`是站点的图标，`color`是站点的背景色。
`ext`字段是vod插件的核心， 指向一个js文件，必须实现如下函数：

```javascript
async function getConfig() {
    return jsonify({
        "tabs": [
            {
                "name": "",
                "ext": {}
            }
        ]
    })
}

async function getCards(ext) {
    return jsonify({
        "list": [
            {
                "vod_id": "",
                "vod_name": "",
                "vod_pic": "",
                "vod_remarks": "",
                "vod_pubdate": "yyyy-MM-dd HH:mm:ss",
                "ext": {}
            }
        ]
    })
}

async function search(ext) {
    // same as getCards
}

async function getTracks(ext) {
    // detail is optional, and all fields are optional
    return jsonify({
        "list": [
            {
                "title": "默认分组",
                "tracks": [
                    {
                        "name": "",
                        "pan": "",
                        "ext": {},
                    }
                ]
            }
        ],
        "detail": {
            "vod_id": "10002",
            "vod_name": "电视剧测试",
            "vod_lang": "中文",
            "vod_area": "韩国",
            "vod_generes": ["奇幻", "爱情"],
            "vod_year": 2024,
            "vod_time": "2025-03-29T16:37:00Z",
            "vod_actor": ["鹿晗", "鹿心"],
            "vod_score": 7.2,
            "vod_serial": true,
            "vod_total": 40,
            "vod_backdrop": "https://ppt.iyf.tv/c/c?position=PRU&i=676&r=7",
            "vod_status": "22集",
            "vod_overview": "38岁，单身，为10年的..."
        }
    })
}

async function getPlayinfo(ext) {
    return jsonify({
        "headers": [{
            "User-Agent": "",
        }],
        "urls": [
            ""
        ]
    })
}

```

* pan插件
  
必须实现的函数：

```javascript
async function saveShare(share_url, passcode = "") {
    return [{
        fid: '1addaaa',
        file_name: 'test.mp4',
        updated_at: 1748646418000,
        is_dir: false,
    }];
}

async function getPlayInfo(fid) {
    return {
        'url': 'https://example.com/test.mp4',
        "headers": {},
    };
}
```

* yt-dlp插件

app会发起POST请求，请求体为JSON格式，包含url字段，值为视频地址，例如：
```shell
curl -X POST https://example.com/api \
     -H "Content-Type: application/json" \
     -d '{"url": "https://www.youtube.com/watch?v=x9X0aII0l70"}'
```
直接返回yt-dlp的输出即可，如需Docker可参考这个[repo](https://github.com/purkylin/youtube-info)

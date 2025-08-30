## 插件格式
```json
[
    {
        "id": "vod",
        "name": "CMS",
        "desc": "VOD",
        "type": "vod",
        "author": "purkylin",
        "version": "0.0.2",
        "icon": null,
        "update_time": "2025-03-29T16:37:00Z",
        "endpoint": "https://example.com/"
    }
]
```
目前支持的插件类型：vod, pan, yt-dlp, trending, hot, danmaku, proxy, iptv, cat-paw-open。

## 插件定义
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

```json
{
    ...,
    "type": "yt-dlp",
    "rules": [
        "https://.*.youtube.com/watch\\?v=([\\w\\-]+).*",
        "https://x.com/\\w+/status/(\\d+).*",
        "https://youtu.be/([\\w\\-]+)\\?si=.+"
    ],
    "cache": 21600,
    "endpoint": "https://demo.com/ytdlp/"
},
```
rules字段是白名单, 使用正则匹配
endpoint指向的服务需要支持下面的curl命令
```shell
curl -X GET https://example.com/api?url=https://www.youtube.com/watch?v=x9X0aII0l70
```
直接返回yt-dlp的输出即可，如需Docker可参考这个[repo](https://github.com/purkylin/youtube-info)

* proxy插件
```json
{
    ...,
    "type": "proxy",
    "api_password": "HAWKAPP",
    "rules": [
        {
            "id": "csp_iyftv",
            "proxy": true,
            "hls": true
        },
        {
            "id": "csp_Olevod",
            "proxy": true
        }
    ],
    "endpoint": "https://ddxpxchjmokh.us-west-1.clawcloudrun.com"
}
```
endpoint字段是你的代理服务地址, 代理服务器使用的是`mhdzumair/mediaflow-proxy`服务,可通过docker安装在你的服务器上; api_password字段是你的代理服务密码; rules字段是代理规则, 代理规则中的id需要和vod插件中的api字段一致， 其中hls默认值为ture, proxy默认值为true。

* iptv插件

```json
{
    ...,
    "type": "iptv",
    "ua": "Hawk/1.0",
    "endpoint": "https://example.com/iptv/"
}
```
endpoint字段是你的iptv m3u源地址，ua字段是可选的， 有些源可能需要设置ua。

* cat-paw-open插件

```json
{
    ...,
    "type": "cat-paw-open",
    "endpoint": "https://example.com/cat-paw-open/"
}
```
endpoint字段是你的cat-paw-open源地址。

* 其他插件

    TODO

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
const { data , status_code} = $fetch.get(`http://xx.com?${params.toString()}`, {headers: {}})
// default method for post: x-www-form-urlencoded
const { data } = await $fetch.post('http://xx.com', {name: 'xx'}, {headers: {}})
// custom method for post: application/json
const { data } = await $fetch.post('http://xx.com', {name: 'xx'}, {headers: {'Content-Type': 'application/json'}})

// parse html
const cheerio = createCheerio()
const $ = cheerio.load(data)
const script = $('#flarum-json-payload').text()

// crypto
const CryptoJS = createCryptoJS()

// toast
$utils.toast("This is a toast")

// base64
base64Decode('....')

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

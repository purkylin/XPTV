const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

let appConfig = {
    ver: 1,
    title: '如意视频',
    site: 'https://rysp9.com',
}

async function getConfig() {
    const tabs = [
        {
            "display": "电视剧",
            "value": 2,
            "checked": 1
        },
        {
            "display": "电影",
            "value": 1,
            "checked": 0
        },
        {
            "display": "综艺",
            "value": 3,
            "checked": 0
        },
        {
            "display": "动漫",
            "value": 4,
            "checked": 0
        },
        {
            "display": "纪录片",
            "value": 32,
            "checked": 0
        }
    ]

    const config = {
        "tabs": tabs.map((item) => {
            return {
                name: item.display,
                ext: {
                    value: item.value,
                },
            }
        })
    }

    return jsonify(config)
}

async function getCards(ext) {
    ext = argsify(ext)
    let { page = 1, value } = ext

    const timestamp = Date.now()
    const url = `${appConfig.site}/video/refresh-cate?page_num=${page}&sorttype=desc&channel_id=${value}&tag=0&area=0&year=0&page_size=24&sort=new&_=${timestamp}`
    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    const json = JSON.parse(data)
    let cards = []
    json.data.list.forEach((item) => {
        const ts = item.chapters[item.chapters.length - 1].created_at
        const pubdate = formatTimestampToBJTime(ts)
        const vod_time = formatTimestampToISOTime(ts)

        cards.push({
            vod_id: item.video_id,
            vod_name: item.video_name,
            vod_pic: item.cover,
            vod_remarks: item.flag,
            vod_pubdate: pubdate,

            ext: {
                chapters: item.chapters,
                detail: {
                    vod_id: item.video_id,
                    vod_name: item.video_name,
                    vod_pic: item.horizontal_cover,
                    vod_remarks: item.flag,
                    vod_overview: item.intro,
                    vod_score: parseFloat(item.score),
                    vod_time: vod_time,
                    vod_generes: item.category.split(' '),
                    vod_actor: item.actors.map(v => v.actor_name)
                },
            },
        })
    })

    return jsonify({
        list: cards,
    })
}

async function getTracks(ext) {
    ext = argsify(ext)
    const { chapters, detail } = ext

    const tracks = chapters.map((chapter) => {
        return {
            name: chapter.title,
            pan: '',
            ext: {
                resource_url: chapter.resource_url,
            },
        }
    })
    return jsonify({
        list: [
            {
                title: '默认分组',
                tracks,
            },
        ],
        detail,
    })
}

async function getPlayinfo(ext) {
    ext = argsify(ext)
    const { resource_url } = ext
    return jsonify({ urls: [resource_url["21"]], headers: [{ 'User-Agent': UA, 'Referer': `${appConfig.site}/` }] })
}

async function search(ext) {
    $utils.toast("暂不支持搜索")
    return jsonify({ list: [] })
}

function formatTimestampToBJTime(ts) {
    const date = new Date(ts * 1000); // 秒 -> 毫秒
    const pad = n => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
        + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatTimestampToISOTime(ts) {
    const date = new Date(ts * 1000); // 秒 -> 毫秒
    return date.toISOString();
}
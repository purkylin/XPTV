const ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)'
const tabs = [
    {
        "title": "国产剧",
        "ext": "tv_domestic",
    },
    {
        "title": "韩国剧",
        "ext": "tv_korean",
    },
    {
        "title": "欧美剧",
        "ext": "tv_american",
    },
    {
        "title": "动画",
        "ext": "tv_animation",
    },
    {
        "title": "影院热映",
        "ext": "movie_showing",
    },
    {
        "title": "豆瓣热门",
        "ext": "movie_hot_gaia",
    }
]

async function getTabs() {
    return tabs;
}

async function getCards(ext) {
    const url = `https://m.douban.com/rexxar/api/v2/subject_collection/${ext}/items`
    const referer = 'https://m.douban.com/tv/'
    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': ua,
            'Referer': referer,
        }
    })
    const result = JSON.parse(data)
    const cards = result.subject_collection_items.map(x => ({
        id: x.id,
        title: x.title,
        year: x.year,
        rating: x.rating?.value,
        poster: x.pic?.normal || x.cover?.url,
        status: x.episodes_info,
        backdrop: x.photos?.[0]?.url,
        tags: x.card_subtitle,
        url: `https://movie.douban.com/subject/${x.id}/`
    }))
    return cards
}
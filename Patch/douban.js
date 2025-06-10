const ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)'
const tv = [
    {
        "category": "tv",
        "type": "tv",
        "title": "综合"
    },
    {
        "category": "tv",
        "type": "tv_domestic",
        "title": "国产剧"
    },
    {
        "category": "show",
        "type": "show",
        "title": "综艺"
    },
    {
        "category": "tv",
        "type": "tv_american",
        "title": "欧美剧"
    },
    {
        "category": "tv",
        "type": "tv_japanese",
        "title": "日剧"
    },
    {
        "category": "tv",
        "type": "tv_korean",
        "title": "韩剧"
    },
    {
        "category": "tv",
        "type": "tv_animation",
        "title": "动画"
    },
    {
        "category": "tv",
        "type": "tv_documentary",
        "title": "纪录片"
    }
]
const movie = [
    {
        "category": "热门",
        "type": "全部",
        "title": "热门"
    },
    {
        "category": "最新",
        "type": "全部",
        "title": "最新"
    },
    {
        "category": "豆瓣高分",
        "type": "全部",
        "title": "豆瓣高分"
    },
    {
        "category": "冷门佳片",
        "type": "全部",
        "title": "冷门佳片"
    },
    {
        "category": "热门",
        "type": "华语",
        "title": "华语"
    },
    {
        "category": "热门",
        "type": "欧美",
        "title": "欧美"
    },
    {
        "category": "热门",
        "type": "韩国",
        "title": "韩国"
    },
    {
        "category": "热门",
        "type": "日本",
        "title": "日本"
    }
]
async function getTabs() {
    const tvItems = tv.map(x => ({
        title: x.title,
        ext: JSON.stringify({
            type: x.type,
            category: x.category,
            tag: "tv"
        }),
    }));
    const movieItems = movie.map(x => ({
        title: x.title,
        ext: JSON.stringify({
            type: x.type,
            category: x.category,
            tag: "movie"
        }),
    }));

    return [
        { "title": "电影", "items": movieItems },
        { "title": "电视剧", "items": tvItems },
    ];
}

async function getCards(ext) {
    const { tag, type, category } = JSON.parse(ext);
    const params = new URLSearchParams({
        limit: "50",
        type: type,
        category: category,
    });
    const referer = 'https://movie.douban.com/';
    const path = tag === 'movie' ? 'movie' : 'tv';
    const url = `https://m.douban.com/rexxar/api/v2/subject/recent_hot/${path}?${params.toString()}`;
    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': ua,
            'Referer': referer,
        }
    })
    const result = JSON.parse(data)
    const cards = result.items.map(x => ({
        id: x.id,
        title: x.title,
        year: x.year,
        rating: x.rating?.value,
        poster: x.pic.large,
        status: x.episodes_info
    }));

    return cards
}
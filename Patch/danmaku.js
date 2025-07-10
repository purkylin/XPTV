const endpoint = "http://api.9228.eu";

// return string
async function search(keyword) {
    const { data } = await $fetch.get(`${endpoint}/danmaku/search?keyword=${keyword}`);
    const result = JSON.parse(data);
    const items = result.map(x => ({
        'id': `${x.sid}`,
        'title': x.title,
        'poster': x.poster,
        'time': x.time,
        'overview': x.overview,
        'status': x.status,
        'ext': JSON.stringify({
            'sid': x.sid,
        }),
    }));
    return JSON.stringify(items);
}

// return string
async function resolve(ext, episode) {
    const { sid } = JSON.parse(ext);

    const { data } = await $fetch.get(`${endpoint}/danmaku/resolve?sid=${sid}`);
    const result = JSON.parse(data);

    let matchedEpisode = result.episodes.find(x => x.title == episode);
    if (!matchedEpisode) {
        const num = parseInt(episode);
        if (!isNaN(num) && num > 0 && num <= result.episodes.length) {
            matchedEpisode = result.episodes[num - 1];
        } else {
            matchedEpisode = result.episodes[0];
        }
    }

    const items = await fetchDanmaku(matchedEpisode.cid, matchedEpisode.duration);
    return JSON.stringify({
        'sid': sid,
        'episode': matchedEpisode.title,
        'items': JSON.parse(items),
    })
}

// return string
async function fetchDanmaku(cid, duration) {
    const { data } = await $fetch.get(`${endpoint}/danmaku/?cid=${cid}&duration=${duration}`);
    return data;
}
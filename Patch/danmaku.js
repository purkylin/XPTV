// return string
async function resolve(url, idx) {
    const data = await parse(url);
    const result = JSON.parse(data);

    let episode = result.episodes.find(x => x.title == idx);
    if (!episode) {
        const num = parseInt(idx);
        if (!isNaN(num) && num > 0 && num <= result.episodes.length) {
            episode = result.episodes[num - 1];
        } else {
            episode = result.episodes[0];
        }
    }

    console.log(episode);
    return await danmaku(episode.cid, episode.duration);
}

// return string
async function danmaku(cid, duration) {
    const { data } = await $fetch.get(`http://api.9228.eu/danmaku/?cid=${cid}&duration=${duration}`);
    return data;
}

// return string
async function parse(url) {
    const params = new URLSearchParams({
        url,
    });
    const { data } = await $fetch.get(`http://api.9228.eu/danmaku/resolve?${params.toString()}`);
    return data;
}
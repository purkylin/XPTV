const cheerio = createCheerio();

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2.1 Mobile/15E148 Safari/604.1';

let appConfig = {
    ver: 1,
    title: '影视天堂',
    site: 'https://ysttv.com',
    tabs: [
        { name: '电影', ext: { id: 1 } },
        { name: '电视', ext: { id: 2 } },
        { name: '陆剧', ext: { id: 2, area: '大陆' } },
        { name: '台剧', ext: { id: 2, area: '台湾' } },
        { name: '港剧', ext: { id: 2, area: '香港' } },
        { name: '美剧', ext: { id: 2, area: '美国' } },
        { name: '韩剧', ext: { id: 2, area: '韩国' } },
        { name: '日剧', ext: { id: 2, area: '日本' } },
        { name: '综艺', ext: { id: 3 } },
        { name: '动漫', ext: { id: 4 } },
        { name: '短剧', ext: { id: 5 } }
    ]
};

async function getConfig() {
    return JSON.stringify(appConfig);
}

async function getCards(ext) {
    ext = JSON.parse(ext);
    let cards = [];
    let { id, area, page = 1 } = ext;

    let url = `${appConfig.site}/library/index/`;
    url += area
        ? `c/${id}/t/all/y/all/a/${area}/s/1/page/${page}`
        : `c/${id}/t/all/y/all/s/1/page/${page}`;

    const { data } = await $fetch.get(url, {
        headers: { 'User-Agent': UA }
    });

    const $ = cheerio.load(data);

    $('main ul.mb-5 > li').each((_, element) => {
        if ($(element).find('.subtitle').text().includes('伦理')) return;
        const href = $(element).find('a').attr('href');
        const pic =
            $(element).find('img').attr('data-src') ||
            $(element).find('img').attr('src');
        const name = $(element).find('a').attr('title');
        const remark =
            parseFloat($(element).find('.tag.bg-dx-blue').text()).toFixed(1) ||
            $(element).find('.text-white').text();
        cards.push({
            vod_id: href,
            vod_name: name,
            vod_pic: pic,
            vod_remarks: remark,
            ext: { url: `${appConfig.site}${href}` }
        });
    });

    return JSON.stringify({ list: cards });
}

async function getTracks(ext) {
    ext = JSON.parse(ext);
    let list = [];
    let url = ext.url;

    const { data } = await $fetch.get(url, {
        headers: { 'User-Agent': UA }
    });

    const $ = cheerio.load(data);

    let vod_name =
        $('h1.text-5xl.font-bold').attr('title') ||
        $('h1.text-5xl.font-bold').text();
    vod_name = vod_name.replace(/《|》/g, '').trim();

    const scoreText = $('div.text-primary span.text-4xl').text().trim();
    const vod_score = scoreText;

    const vod_year =
        parseInt($('a.dx-btn-link').eq(1).text().trim(), 10) || 0;
    const vod_area = $('a.dx-btn-link').eq(2).text().trim();

    const actorText = $('div.mb-1.line-clamp-1').text().trim();
    const vod_actor = actorText
        .replace('主演：', '')
        .split(',')
        .map(item => item.trim())
        .filter(item => item);

    const updateText = $('div.mb-1')
        .filter(function () {
            return $(this).text().includes('更新：');
        })
        .text()
        .replace('更新：', '')
        .trim();
    const vod_time = updateText.replace(' ', 'T') + 'Z';

    const totalText = $('div.mb-1')
        .filter(function () {
            return $(this).text().includes('集数：');
        })
        .text()
        .replace('集数：', '')
        .trim();
    const vod_total = parseInt(totalText, 10) || 0;


    const tagText = $('div.mb-1')
        .filter(function () {
            return $(this).text().includes('TAG：');
        })
        .text()
        .replace('TAG：', '')
        .trim();
    const vod_generes = tagText
        .split(/,|，/)
        .map(item => item.trim())
        .filter(item => item);

    const overviewText = $('div.line-clamp-6').text().trim();
    const vod_overview = overviewText.replace(/^剧情：/, '').trim();

    const vod_serial = true;
    //const vod_status = totalText + '集';

    let detail = {
        vod_name,
        vod_area,
        vod_generes,
        vod_year,
        vod_time,
        vod_actor,
        vod_score,
        vod_serial,
        //vod_status,
        vod_total,
        vod_overview
    };

    let tracks = [];

    $('.overflow-auto > ul > li').each((_, element) => {
        const name = $(element).find('a').text().trim();
        const href = $(element).find('a').attr('href');
        tracks.push({
            name: name,
            ext: { url: `${appConfig.site}${href}` }
        });
    });

    list.push({
        title: '默认分组',
        tracks: tracks
    });

    return JSON.stringify({ list: list, detail: detail });
}

async function getPlayinfo(ext) {
    ext = JSON.parse(ext);
    const url = ext.url;

    const { data } = await $fetch.get(url, {
        headers: { 'User-Agent': UA }
    });

    const $ = cheerio.load(data);
    const playUrl = $('#mse').attr('data-url');

    return JSON.stringify({ urls: [playUrl], headers: [{ 'User-Agent': UA }] });
}

async function search(ext) {
    ext = JSON.parse(ext);
    let cards = [];

    let text = encodeURIComponent(ext.text);
    let page = ext.page || 1;
    let url = `${appConfig.site}/search/index/type/1/keyword/${text}/page/${page}`;

    const { data } = await $fetch.get(url, {
        headers: { 'User-Agent': UA }
    });

    const $ = cheerio.load(data);

    $('main ul.grid > li').each((_, element) => {
        const href = $(element).find('a').attr('href');
        const pic =
            $(element).find('img').attr('data-src') ||
            $(element).find('img').attr('src');
        const name = $(element).find('a').attr('title');
        cards.push({
            vod_id: href,
            vod_name: name,
            vod_pic: pic,
            vod_remarks: '',
            ext: { url: `${appConfig.site}${href}` }
        });
    });

    return JSON.stringify({ list: cards });
}
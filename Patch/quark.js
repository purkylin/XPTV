const cookie = $cookie;
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 Core/1.94.225.400 QQBrowser/12.2.5544.400",
    "Origin": "https://pan.quark.cn",
    "Referer": "https://pan.quark.cn/",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cookie": cookie,
    "Content-Type": "application/json"
};
const saveDirName = "Hawk Save";

function getTimestamp() {
    return Date.now().toString();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

async function listDir(pdir_fid = "0", page = "1", size = "100", fetch_total = "false", sort = "") {
    const params = new URLSearchParams({
        pr: "ucpro",
        fr: "pc",
        uc_param_str: "",
        pdir_fid,
        _page: page,
        _size: size,
        _fetch_total: fetch_total,
        _fetch_sub_dirs: "1",
        _sort: sort,
        __dt: getRandomInt(100, 9999).toString(),
        __t: getTimestamp()
    });

    const { data } = await $fetch.get(`https://drive-pc.quark.cn/1/clouddrive/file/sort?${params.toString()}`, {
        headers
    });

    const result = JSON.parse(data);
    checkResult(result);
    const files = result.data.list.map(x => ({
        fid: x.fid,
        file_name: x.file_name,
        updated_at: x.updated_at,
        is_dir: x.dir
    }));
    console.log("list dir success");

    return files;
}

async function handleSave(fid, pwd_id, stoken, share_fid_token) {
    const api_save = "https://drive-pc.quark.cn/1/clouddrive/share/sharepage/save";
    const params = new URLSearchParams({
        pr: "ucpro",
        fr: "pc",
        uc_param_str: "",
        __dt: getRandomInt(100, 9999).toString(),
        __t: getTimestamp()
    });

    const payload = {
        pwd_id,
        fid_list: [fid],
        fid_token_list: [share_fid_token],
        stoken,
        to_pdir_fid: "0",
        pdir_fid: "0",
        scene: "link"
    };

    // create save task
    const { data: saveData } = await $fetch.post(`${api_save}?${params.toString()}`, payload, {
        headers,
    });

    const result = JSON.parse(saveData);
    checkResult(result);
    const task_id = result.data?.task_id;
    console.log("create save task success")

    await $sleep(0.6);

    // submit save task
    const api_submit = "https://drive-pc.quark.cn/1/clouddrive/task";
    const params_submit = new URLSearchParams({
        pr: "ucpro",
        fr: "pc",
        uc_param_str: "",
        task_id,
        retry_index: "0",
        __dt: getRandomInt(10000, 99999).toString(),
        __t: getTimestamp()
    });
    const { data: submitData } = await $fetch.get(`${api_submit}?${params_submit.toString()}`, {
        headers
    });

    const submitResult = JSON.parse(submitData);
    checkResult(submitResult);
    console.log("submit", submitResult);
    const save_fid = submitResult.data.save_as.save_as_top_fids[0];
    const updated_at = submitResult.data.finished_at;
    console.log("submit save task success", submitResult)

    return {
        "fid": save_fid,
        updated_at,
    }
}

// public
async function saveShare(share_url, passcode = "") {
    if (!cookie) {
        throw new Error("请先设置Cookie");
    }

    const pwd_id = share_url.split("/s/").pop().split("?")[0];

    // request stoken
    const api_stoken = "https://drive-pc.quark.cn/1/clouddrive/share/sharepage/token";
    const { data: stokenData } = await $fetch.post(api_stoken, {
        pwd_id,
        passcode
    }, {
        headers
    });

    const stokenResult = JSON.parse(stokenData);
    checkResult(stokenResult);
    const stoken = stokenResult.data?.stoken;
    console.log("request stoken success");

    // find save dir
    const topFiles = await listDir();
    const pdir_fid = topFiles.find(u => u.file_name === saveDirName)?.fid || '0';

    // request detail
    const api_detail = "https://drive-pc.quark.cn/1/clouddrive/share/sharepage/detail";
    const detailParams = new URLSearchParams({
        pwd_id,
        stoken,
        pdir_fid: pdir_fid
    });
    const { data: detailData } = await $fetch.get(`${api_detail}?${detailParams.toString()}`, {
        headers
    });

    const detailResult = JSON.parse(detailData);
    checkResult(detailResult);
    const file_list = detailResult.data?.list || [];
    if (file_list.length === 0) {
        throw new Error("未找到文件");
    }
    const { file_name: fname, dir: is_dir, fid, share_fid_token, updated_at } = file_list[0];
    console.log("request detail success", file_list[0]);

    // check file existed
    let files = await listDir(pdir_fid);
    let target = files.find(u => u.file_name === fname);
    if (!target) {
        const { fid: save_fid, updated_at: save_updated_at } = await handleSave(fid, pwd_id, stoken, share_fid_token);
        target = {
            fid: save_fid,
            file_name: fname,
            is_dir: is_dir,
            updated_at: save_updated_at
        }
    } else {
        // 有误差，600秒内不更新
        if (target.updated_at + 600 * 1000 < updated_at) {
            console.log("time", target.updated_at, updated_at)
            $utils.toast("文件有更新");
        }
    }

    if (target.is_dir) {
        const children = await listDir(target.fid);
        return children;
    } else {
        return [target];
    }
}

// public
async function getPlayInfo(fid) {
    const params = new URLSearchParams({
        pr: "ucpro",
        fr: "pc",
        uc_param_str: ""
    });

    const data = {
        fid,
        supports: "fmp4,m3u8",
        resolutions: "normal,low,high,super,2k,4k"
    };

    const url = "https://drive-pc.quark.cn/1/clouddrive/file/v2/play";

    const { data: playData } = await $fetch.post(`${url}?${params.toString()}`, data, {
        headers
    });

    const playResult = JSON.parse(playData);
    checkResult(playResult);

    const videoList = playResult.data.video_list || [];
    for (const item of videoList) {
        const video_info = item.video_info;
        if (video_info) {
            const newHeaders = {
                "User-Agent": headers["User-Agent"],
                "Cookie": headers["Cookie"],
                "Origin": headers["Origin"],
                "Referer": "https://pan.quark.cn/",
            }
            return {
                'url': video_info.url,
                "headers": newHeaders,
            };
        }
    }

    throw new Error("未找到播放地址");
}

function checkResult(result) {
    switch (result.code) {
        case 32003:
            throw new Error("转存失败，网盘容量不足");
        case 41013:
            throw new Error("网盘目录不存在");
        case 0:
            return;
        default:
            throw new Error(result.message)
    }
}

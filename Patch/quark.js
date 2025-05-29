const cookie = "__wpkreporterwid_=06385103-1b49-42e0-9dfa-2238695f9b9f; isg=BENDr3-tL5xBWePr-HYLqVhq0AHtuNf6UEC9CnUhvKIZNGdW_YuqS_Lurkx6jy_y; tfstk=gh7sRxZyhtQUR1LxGhVERdwze88m1WzzkjOAZs3ZMFLOME6BLCoajnyfAtBeBV89BenXaQu9Hlxxced2ndLVbdRAdsBTsIPMWntdETIasoVi9BdNeqn9kKhGxT5-7NrMuqTwoEezUzzrs1YDkXNoYeDgJQd0uqdxWFYpkjmA0zzPs1hw675LzZodtLJMHEntXHFBgIk9kc3TOpdXZmHOHtFBJQASDx3v6BHpgppvkEBA9WO2pCLvkBDTjBlXK1NZmFhzvuU1opgxkwOpILB_8qRC5Ct6e1nqkqFH1h9R6peTAmKHcOt18PMk1MCWNCsQMDpOTN1X1MNxvdCAZajP4f3yFNEscXtokBigOWimmGO0jES3mUlBXBAEMWNI4Vx9tBT0OWimmhdHTuVQO0uG.; __puus=989af987faa6dd6b4898d1aa634bbb41AASb3MCRUY5mI5KmcBx+x0yPjhN8/xML20Gl3m489EvWhozi5B8jgl1H706f00QEVoEnlbFDagFyBtDCZDk3X3mIMLoV++MjsO745/eUFa4i1akyiVdf6ALAsSSFUcq+rCbzZDhzh7/bCGoBEWM+mCR8FB6YQ9dYTKYqS9rLjdDkJXSeze6Fp9IVE6pTOQNmiFredB/z5YALFn3owSSH6XgV; isQuark=true; isQuark.sig=hUgqObykqFom5Y09bll94T1sS9abT1X-4Df_lzgl8nM; __chkey=; b-user-id=459bf23f-0e8a-1e49-7d39-861ea7c1775c; _UP_30C_6A_=st9c9620136vdo5soj3i3syaakptmhmc; _UP_335_2B_=1; _UP_D_=pc; _UP_E37_B7_=sg1b7703a84bf63f7b4cf7e001e9b8ad3ea; _UP_TG_=st9c9620136vdo5soj3i3syaakptmhmc; _UP_TS_=sg1b7703a84bf63f7b4cf7e001e9b8ad3ea; __kp=b1cc9960-3b00-11f0-af33-fd159df37910; __kps=AARflAVkm7Ew0uueRzWi8943; __ktd=kv4IGwuz0Jg/hZhcf907wg==; __pus=9f65e1caa520bd1a86f69e416f5b4bb0AAQufO4iBCzl30fmrOmXK06gEMOW1UpDF8WrbOh0Y0DMMcLvs084EabkyIOLrrsdNA7eO2YSg4lOiLxdrXuf2c1t; __uid=AARflAVkm7Ew0uueRzWi8943; __wpkreporterwid_=f39826bf-778a-49bc-b31d-8b5802130bf5; _ON_EXT_DVIDN=eCy#AAPg92ev/ST+d9aI1Ilxxf3pTdJXfASqxrMaKkcVhGq7usgqGzKiHTuO3G4L86GhrGI=; _qk_bx_ck_v1=eyJkZXZpY2VJZCI6ImVDeSNBQVBnOTJldi9TVCtkOWFJMUlseHhmM3BUZEpYZkFTcXhyTWFLa2NWaEdxN3VzZ3FHektpSFR1TzNHNEw4NkdockdJPSIsImRldmljZUZpbmdlcnByaW50IjoiMjQ2MjgzMzk0OTFhZTYzNDM2YjNjNDA3NDQ4ZTBiNGQifQ==; _UP_HASH_UID=uhash:45ae3bed07bdaae1f76218c615a4b410; _UP_KP=1:607:f28d9b00c54b0dd67e35db47b154a303:TiRypN4Ss2WxN1YM1m292BWCMZ4GvTBmiSTulg5MjJhy3OCx+ji0BMM0mq8JLyv41dRCTEfER7vF6s9XHFikhmbpV1D7Qs8/V4p0ghXB4RFBTA==; _UP_WG_UID=TiQPSQw53pMuJKXzexSmbJzB; __sdid=AAR+IhBw+/GSsZFbv2U3GK7Jrb+ANSkkFxE6rrbcCOFSfTBkG+pIKf/8KGL19ij2mxM=; b-user-id=459bf23f-0e8a-1e49-7d39-861ea7c1775c; grey-id=0246c912-2120-3dd3-a4e7-cc781135b11c; grey-id.sig=guCcnxsU39e9g1eFRXe-1urr2ZXj6wO2wuc8D-ZtXpg; xlly_s=1; ctoken=xPIDYcz0pxjAqXtAG445mX4x; web-grey-id=2d04d6ab-99c2-7278-5804-7f23517285ff; web-grey-id.sig=VqOZM-BZwvHC1jazNktGZ3XqTUSlxk2EctzpVMEjbIA; _UP_A4A_11_=wb9c61e2e43842268f56daf15e616ff4";
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 Core/1.94.225.400 QQBrowser/12.2.5544.400",
    "Origin": "https://pan.quark.cn",
    "Referer": "https://pan.quark.cn/",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cookie": cookie,
    "Content-Type": "application/json"
};

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
        is_dir: x.dir
    }));
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

    console.log(params.toString());

    // create save task
    const { data: saveData } = await $fetch.post(`${api_save}?${params.toString()}`, payload, {
        headers,
    });

    const result = JSON.parse(saveData);
    checkResult(result);
    const task_id = result.data?.task_id;

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
    const { data: submitData } = await $fetch.get(`${api_submit}?${params_submit.toString()}`, {}, {
        headers
    });
    checkResult(JSON.parse(submitData));
}

async function saveShare(share_url, passcode = "") {
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

    // request detail
    const api_detail = "https://drive-pc.quark.cn/1/clouddrive/share/sharepage/detail";
    const detailParams = new URLSearchParams({
        pwd_id,
        stoken,
        pdir_fid: "0"
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
    const { file_name: fname, dir: is_dir, fid, share_fid_token } = file_list[0];

    // check file
    let files = await listDir();
    let target = files.find(u => u.file_name === fname);
    if (!target) {
        await handleSave(fid, pwd_id, stoken, share_fid_token);
        files = await listDir();
        target = files.find(u => u.file_name === fname);
    } else {
        console.log("文件已存在");
    }

    if (target.is_dir) {
        const children = await listDir(target.fid);
        return children;
    } else {
        return [target];
    }
}

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
            return {
                'url': video_info.url,
            };
        }
    }

    throw new Error("未找到播放地址");
}

function checkResult(result) {
    if (result.code !== 0) {
        throw new Error(result.message);
    }
}
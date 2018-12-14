export default {
    // 主要 API 接口
    api: 'http://localhost:8001',
    // 虛擬時間 API 接口
    api_vtime: 'http://localhost:8002',
    // 主要 API Polling 間隔
    fetch_interval: 10 * 1000,
    // 虛擬時間 API Polling 間隔
    fetch_vtime_interval: 30 * 1000,
    // 快速繪圖模式，請設定 true 增加效能
    fast_render: true,
    // 開啟畫面後，跳轉至 Sponsor 介面的時間
    redirect_to_sponsors: 60 * 1000,
    // Sponsor 介面網址，請務必加上 ?redirect=dashboard
    // 輪播 Sponsor 完畢會導向回 /assets/dashboard/
    // 若需更改請編輯 sponsor/index.html:300
    sponsor_link: 'sponsors/?redirect=dashboard',
    rnd_attack: 0.4
};
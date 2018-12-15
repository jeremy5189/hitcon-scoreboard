export default {
    // 主要 API 接口
    api: 'mock-server/server.json',
    // 虛擬時間 API 接口
    api_vtime: 'mock-server/vtime.json',
    // 主要 API Polling 間隔
    fetch_interval: 10 * 1000,
    // 虛擬時間 API Polling 間隔
    fetch_vtime_interval: 30 * 1000,
    // 快速繪圖模式，請設定 true 增加效能
    fast_render: true,
};
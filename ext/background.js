// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    checkUrl(tabId, changeInfo.url);
  }
});

// 检查 URL 是否在黑名单中
async function checkUrl(tabId, url) {
  const { blockedUrls = [] } = await chrome.storage.local.get('blockedUrls');
  
  const isBlocked = blockedUrls.some(blockedUrl => 
    url.toLowerCase().includes(blockedUrl.toLowerCase())
  );

  if (isBlocked) {
    // 关闭包含被阻止 URL 的标签页
    chrome.tabs.remove(tabId);
    // 打开新的标签页
    chrome.tabs.create({});
  }
} 
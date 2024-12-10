document.addEventListener('DOMContentLoaded', async () => {
  // 加载已保存的 URL 列表
  await loadBlockedUrls();
  
  // 添加新 URL 的事件监听
  document.getElementById('addUrl').addEventListener('click', addBlockedUrl);
});

async function loadBlockedUrls() {
  const { blockedUrls = [] } = await chrome.storage.local.get('blockedUrls');
  const urlList = document.getElementById('urlList');
  urlList.innerHTML = '';
  
  blockedUrls.forEach(url => {
    const div = document.createElement('div');
    div.className = 'url-item';
    
    const span = document.createElement('span');
    span.textContent = url;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.onclick = () => removeBlockedUrl(url);
    
    div.appendChild(span);
    div.appendChild(deleteButton);
    urlList.appendChild(div);
  });
}

async function addBlockedUrl() {
  const input = document.getElementById('urlInput');
  const url = input.value.trim();
  
  if (!url) return;
  
  const { blockedUrls = [] } = await chrome.storage.local.get('blockedUrls');
  if (!blockedUrls.includes(url)) {
    blockedUrls.push(url);
    await chrome.storage.local.set({ blockedUrls });
    await loadBlockedUrls();
  }
  
  input.value = '';
}

async function removeBlockedUrl(urlToRemove) {
  const { blockedUrls = [] } = await chrome.storage.local.get('blockedUrls');
  const updatedUrls = blockedUrls.filter(url => url !== urlToRemove);
  await chrome.storage.local.set({ blockedUrls: updatedUrls });
  await loadBlockedUrls();
} 
import { iosShare, iosAddHomescreen } from "../icons/icon.js";
import { detectPlatform } from "./utils.js";
import { toast } from "./toast.js";

function isPWAInstalled() {
  // iOS 上的檢測方法
  const isIOSStandalone = navigator.standalone;

  // Android/Chrome 上的檢測方法
  const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;

  return isIOSStandalone || isStandaloneMode;
}

// 使用方法
if (isPWAInstalled()) {
  console.log('此網頁正以 PWA 模式運行');
  document.body.classList.add('pwa');
  document.body.appendChild(document.createTextNode('目前在 PWA 裡跑！\n'));
} else {
  console.log('此網頁未以 PWA 模式運行');
  document.body.classList.remove('pwa');
  document.body.appendChild(document.createTextNode('目前是一般網頁模式。\n'));
}

async function checkInstalledPWA() {
  if ('getInstalledRelatedApps' in navigator) {
    const relatedApps = await navigator.getInstalledRelatedApps();
    return relatedApps.length > 0;
  }
  return false;
}

// 使用方法
checkInstalledPWA().then(isInstalled => {
  if (isInstalled) {
    console.log('PWA 已安裝');
    document.body.appendChild(document.createTextNode('目前已經安裝了 PWA！\n'));
  } else {
    console.log('PWA 未安裝');
    document.body.appendChild(document.createTextNode('目前沒有安裝 PWA！\n'));
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA 已成功安裝！');
  document.body.appendChild(document.createTextNode('PWA 已成功安裝！\n'));
  // 更新 UI 或儲存安裝狀態
});

let deferredPrompt;
let rejectPrompt = false;

window.addEventListener('beforeinstallprompt', (e) => {
  // 如果用戶已經拒絕過安裝提示，則不再顯示
  if (rejectPrompt) {
    return;
  }
  // 阻止 Chrome 自動顯示安裝提示
  e.preventDefault();
  // 保存事件，以便稍後觸發
  deferredPrompt = e;
  // 顯示自訂的「安裝」按鈕
  const toastPwa = toast({
    message: '點選安裝按鈕以安裝 PWA',
    duration: 5000,
    transition: true,
    action: {
      text: '安裝',
      onClick: async () => {
        if (!deferredPrompt) {
          return;
        }
        // 顯示安裝提示
        deferredPrompt.prompt();
        // 等待用戶回應
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`用戶 ${outcome === 'accepted' ? '接受' : '拒絕'}了安裝`);
        if (rejectPrompt !== 'accepted') {
          // 用戶拒絕了安裝提示
          rejectPrompt = true;
        }
      }
    }
  });
});

if (detectPlatform() === 'ios') {
  console.log('iOS 平台');
  // 這裡可以加 iOS 的特定邏輯
  const message1 = `點擊底部的「分享」${iosShare(16, 16)}按鈕`;
  const message2 = `點選「加入主畫面」${iosAddHomescreen(16, 16)}選項`;
  alert(message1 + '\n' + message2);
}
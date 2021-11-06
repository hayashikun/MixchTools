let isActive = false

window.onload = (event) => {
  const activateButton: HTMLElement = document.getElementById('activateButton')!

  const updatePushActivationButton = function () {
    chrome.storage.sync.get('push', (data) => {
      isActive = data.push
      activateButton.innerText = isActive ? 'Deactivate' : 'Activate'
    })
  }

  updatePushActivationButton()
  activateButton.onclick = () => {
    isActive = !isActive
    chrome.storage.sync.set({ push: isActive }, () => {
      updatePushActivationButton()
    })
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id!, { message: 'push', activate: isActive })
    })
  };

  ['reset', 'vertical'].forEach((i) => {
    const button = document.getElementById(`${i}LayoutButton`)!
    button.onclick = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id!, { message: 'layout', layout: i })
      })
    }
  })

  const videoWidthInput = document.getElementById('videoWidthInput')! as HTMLInputElement
  chrome.storage.sync.get('video_width', (data) => {
    videoWidthInput.value = data.video_width ?? 100
  })
  videoWidthInput.onchange = (event) => {
    chrome.storage.sync.set({ video_width: videoWidthInput.value }, () => {})
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id!,
        { message: 'variable', key: '--video-width', value: `${videoWidthInput.value}%` }
      )
    })
  }

  const chatLogHeightInput = document.getElementById('chatLogHeightInput')! as HTMLInputElement
  chrome.storage.sync.get('chat_log_height', (data) => {
    chatLogHeightInput.value = data.chat_log_height ?? 800
  })
  chatLogHeightInput.onchange = (event) => {
    chrome.storage.sync.set({ video_width: chatLogHeightInput.value }, () => {})
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id!,
        { message: 'variable', key: '--chat-log-height', value: `${chatLogHeightInput.value}px` }
      )
    })
  }
}

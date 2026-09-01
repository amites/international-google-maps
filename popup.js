const EXTENSION_ENABLED_KEY = "internationalNamesEnabled";
const enabledCheckbox = document.querySelector("#enabled");

chrome.storage.sync.get({ [EXTENSION_ENABLED_KEY]: true }, (settings) => {
  enabledCheckbox.checked = settings[EXTENSION_ENABLED_KEY];
});

enabledCheckbox.addEventListener("change", () => {
  chrome.storage.sync.set({ [EXTENSION_ENABLED_KEY]: enabledCheckbox.checked });
});

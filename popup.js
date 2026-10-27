const input = document.querySelector("#urls");
const button = document.querySelector("#open");
const status = document.querySelector("#status");
const groupTabs = document.querySelector("#group-tabs");
const groupOptions = document.querySelector("#group-options");
const groupName = document.querySelector("#group-name");
const rememberGroupName = document.querySelector("#remember-group-name");
const colorButtons = document.querySelectorAll(".color-dot");
let groupColor = "grey";

rememberGroupName.checked = localStorage.getItem("rememberGroupName") === "true";
if (rememberGroupName.checked) {
  groupName.value = localStorage.getItem("groupName") || "";
}

document.querySelectorAll("[data-i18n]").forEach((element) => {
  element.textContent = chrome.i18n.getMessage(element.dataset.i18n);
});
document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
  element.placeholder = chrome.i18n.getMessage(element.dataset.i18nPlaceholder);
});
document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
  element.setAttribute("aria-label", chrome.i18n.getMessage(element.dataset.i18nAriaLabel));
});

function setStatus(message, substitutions = []) {
  status.textContent = chrome.i18n.getMessage(message, substitutions);
}

function extractUrls(text) {
  return [...new Set(text.match(/https?:\/\/[^\s<>'"`]+/gi) || [])];
}

groupTabs.addEventListener("change", () => {
  groupOptions.hidden = !groupTabs.checked;
  if (groupTabs.checked) groupName.focus();
});

rememberGroupName.addEventListener("change", () => {
  if (rememberGroupName.checked) {
    localStorage.setItem("rememberGroupName", "true");
    localStorage.setItem("groupName", groupName.value);
  } else {
    localStorage.removeItem("rememberGroupName");
    localStorage.removeItem("groupName");
  }
});

groupName.addEventListener("input", () => {
  if (rememberGroupName.checked) localStorage.setItem("groupName", groupName.value);
});

colorButtons.forEach((colorButton) => {
  colorButton.addEventListener("click", () => {
    groupColor = colorButton.dataset.color;
    colorButtons.forEach((button) => {
      const isSelected = button === colorButton;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-checked", String(isSelected));
    });
  });
});

button.addEventListener("click", async () => {
  const urls = extractUrls(input.value);

  if (urls.length === 0) {
    setStatus("noUrls");
    return;
  }

  button.disabled = true;
  setStatus("opening");

  try {
    const openedTabs = [];
    for (const url of urls) {
      openedTabs.push(await chrome.tabs.create({ url, active: false }));
    }

    if (groupTabs.checked) {
      const groupId = await chrome.tabs.group({ tabIds: openedTabs.map((tab) => tab.id) });
      await chrome.tabGroups.update(groupId, {
        title: groupName.value.trim() || chrome.i18n.getMessage("defaultGroupName"),
        color: groupColor
      });
    }

    const message = groupTabs.checked
      ? (urls.length === 1 ? "openedOneGrouped" : "openedManyGrouped")
      : (urls.length === 1 ? "openedOne" : "openedMany");
    setStatus(message, [String(urls.length)]);
  } catch (error) {
    setStatus("openError");
    console.error(error);
  } finally {
    button.disabled = false;
  }
});

input.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") button.click();
});

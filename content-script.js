const EXTENSION_ENABLED_KEY = "internationalNamesEnabled";
const OBSERVED_ATTRIBUTE_NAMES = ["aria-label", "title"];
const SKIPPED_ELEMENT_NAMES = new Set([
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "OPTION",
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
]);
const NAME_REPLACEMENTS = [
  [/\bLake America\b/gi, "Lake Ontario"],
  [/\bGulf of America\b/gi, "Gulf of Mexico"],
];
const MAP_CENTER_PATTERN = /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(\d+(?:\.\d+)?)z/;
const MAP_TILE_SIZE = 256;
const MAP_OVERLAY_ID = "international-names-map-overlay";
const MAP_LABELS = [
  {
    id: "lake-ontario",
    latitude: 43.62,
    longitude: -77.95,
    minimumZoom: 7,
    name: "Lake Ontario",
  },
  {
    id: "gulf-of-mexico",
    latitude: 25.3,
    longitude: -90,
    minimumZoom: 4,
    name: "Gulf of Mexico",
  },
];

let extensionEnabled = true;
let pendingRoots = new Set();
let updateScheduled = false;
let mapOverlay;
let mapLabelElements = new Map();

function replaceInternationalNames(value) {
  return NAME_REPLACEMENTS.reduce(
    (updatedValue, [pattern, replacement]) => updatedValue.replace(pattern, replacement),
    value,
  );
}

function shouldSkipNode(node) {
  const parent = node.parentElement;
  return (
    !parent ||
    SKIPPED_ELEMENT_NAMES.has(parent.tagName) ||
    parent.isContentEditable ||
    parent.closest("[contenteditable='true']") !== null
  );
}

function updateTextNodes(root) {
  const textNodes = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = textNodes.nextNode();

  while (node) {
    if (!shouldSkipNode(node)) {
      const updatedValue = replaceInternationalNames(node.nodeValue);
      if (updatedValue !== node.nodeValue) {
        node.nodeValue = updatedValue;
      }
    }
    node = textNodes.nextNode();
  }
}

function updateAccessibleLabels(root) {
  if (!(root instanceof Element || root instanceof Document || root instanceof DocumentFragment)) {
    return;
  }

  const elements =
    root instanceof Element
      ? [root, ...root.querySelectorAll("[aria-label], [title]")]
      : root.querySelectorAll("[aria-label], [title]");

  for (const element of elements) {
    for (const attributeName of OBSERVED_ATTRIBUTE_NAMES) {
      const value = element.getAttribute(attributeName);
      if (value) {
        const updatedValue = replaceInternationalNames(value);
        if (updatedValue !== value) {
          element.setAttribute(attributeName, updatedValue);
        }
      }
    }
  }
}

function getMapView() {
  const mapState = location.href.match(MAP_CENTER_PATTERN);
  if (!mapState) {
    return null;
  }

  return {
    latitude: Number(mapState[1]),
    longitude: Number(mapState[2]),
    zoom: Number(mapState[3]),
  };
}

function getMapCanvasBounds() {
  return [...document.querySelectorAll("canvas")]
    .map((canvas) => canvas.getBoundingClientRect())
    .filter((bounds) => bounds.width > 300 && bounds.height > 300)
    .sort((left, right) => right.width * right.height - left.width * left.height)[0];
}

function projectCoordinate(latitude, longitude, zoom) {
  const scale = MAP_TILE_SIZE * 2 ** zoom;
  const latitudeRadians = (latitude * Math.PI) / 180;

  return {
    x: ((longitude + 180) / 360) * scale,
    y: ((1 - Math.asinh(Math.tan(latitudeRadians)) / Math.PI) / 2) * scale,
  };
}

function createMapOverlay() {
  mapOverlay = document.createElement("div");
  mapOverlay.id = MAP_OVERLAY_ID;
  mapOverlay.setAttribute("aria-hidden", "true");
  Object.assign(mapOverlay.style, {
    all: "initial",
    display: "block",
    inset: "0",
    pointerEvents: "none",
    position: "fixed",
    zIndex: "2147483647",
  });

  for (const label of MAP_LABELS) {
    const element = document.createElement("span");
    element.textContent = label.name;
    Object.assign(element.style, {
      background: "rgba(125, 210, 238, 0.99)",
      border: "0",
      borderRadius: "2px",
      boxShadow: "none",
      color: "#466c7b",
      display: "block",
      font: "500 12px/1.2 Roboto, Arial, sans-serif",
      minWidth: "116px",
      padding: "6px 8px",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      whiteSpace: "nowrap",
    });
    mapOverlay.append(element);
    mapLabelElements.set(label.id, element);
  }

  document.body.append(mapOverlay);
}

function keepMapOverlayOnTop() {
  if (mapOverlay.parentElement !== document.body || document.body.lastElementChild !== mapOverlay) {
    document.body.append(mapOverlay);
  }
}

function wrapHorizontalDistance(distance, mapWidth) {
  if (distance > mapWidth / 2) {
    return distance - mapWidth;
  }
  if (distance < -mapWidth / 2) {
    return distance + mapWidth;
  }
  return distance;
}

function renderMapLabels() {
  if (!mapOverlay) {
    createMapOverlay();
  }
  keepMapOverlayOnTop();

  const mapView = getMapView();
  const mapBounds = getMapCanvasBounds();
  if (!extensionEnabled || !mapView || !mapBounds) {
    mapOverlay.hidden = true;
    return;
  }

  mapOverlay.hidden = false;
  const center = projectCoordinate(mapView.latitude, mapView.longitude, mapView.zoom);
  const worldWidth = MAP_TILE_SIZE * 2 ** mapView.zoom;

  for (const label of MAP_LABELS) {
    const point = projectCoordinate(label.latitude, label.longitude, mapView.zoom);
    const horizontalDistance = wrapHorizontalDistance(point.x - center.x, worldWidth);
    const x = mapBounds.left + mapBounds.width / 2 + horizontalDistance;
    const y = mapBounds.top + mapBounds.height / 2 + point.y - center.y;
    const isVisible =
      mapView.zoom >= label.minimumZoom &&
      x >= mapBounds.left &&
      x <= mapBounds.right &&
      y >= mapBounds.top &&
      y <= mapBounds.bottom;
    const element = mapLabelElements.get(label.id);

    element.style.display = isVisible ? "block" : "none";
    if (isVisible) {
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
    }
  }
}

function updateRoot(root) {
  if (!extensionEnabled) {
    return;
  }

  updateTextNodes(root);
  updateAccessibleLabels(root);
  renderMapLabels();
}

function queueUpdate(root) {
  if (!root) {
    return;
  }

  pendingRoots.add(root);
  if (updateScheduled) {
    return;
  }

  updateScheduled = true;
  requestAnimationFrame(() => {
    updateScheduled = false;
    const rootsToUpdate = [...pendingRoots];
    pendingRoots = new Set();
    for (const pendingRoot of rootsToUpdate) {
      updateRoot(pendingRoot);
    }
  });
}

function observeGoogleMaps() {
  const observer = new MutationObserver((mutations) => {
    if (!extensionEnabled) {
      return;
    }

    for (const mutation of mutations) {
      if (mutation.type === "characterData") {
        queueUpdate(mutation.target.parentElement);
      } else if (mutation.type === "attributes") {
        queueUpdate(mutation.target);
      } else {
        for (const node of mutation.addedNodes) {
          if (
            node.nodeType === Node.ELEMENT_NODE ||
            node.nodeType === Node.DOCUMENT_FRAGMENT_NODE
          ) {
            queueUpdate(node);
          } else if (node.nodeType === Node.TEXT_NODE) {
            queueUpdate(node.parentElement);
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true,
    attributeFilter: OBSERVED_ATTRIBUTE_NAMES,
  });
}

chrome.storage.sync.get({ [EXTENSION_ENABLED_KEY]: true }, (settings) => {
  extensionEnabled = settings[EXTENSION_ENABLED_KEY];
  updateRoot(document);
  observeGoogleMaps();
  window.setInterval(renderMapLabels, 250);
  window.addEventListener("resize", renderMapLabels);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync" || !changes[EXTENSION_ENABLED_KEY]) {
    return;
  }

  extensionEnabled = changes[EXTENSION_ENABLED_KEY].newValue;
  if (extensionEnabled) {
    updateRoot(document);
  } else if (mapOverlay) {
    mapOverlay.hidden = true;
  }
});

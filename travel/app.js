const STORAGE_KEY = 'qinghai-trip-planner-v1';
const WEATHER_CACHE_KEY = 'qinghai-trip-weather-v1';
const GEOCODE_CACHE_KEY = 'qinghai-trip-geocode-v1';
const PHOTO_DB_NAME = 'qinghai-trip-media-v1';
const PHOTO_STORE = 'photos';
const PHOTO_FUNCTION_NAME = 'trip-photos';
const PHOTO_MAX_BYTES = 2 * 1024 * 1024;

const weatherLocations = {
  '西安': { latitude: 34.3416, longitude: 108.9398 },
  '兰州': { latitude: 36.0611, longitude: 103.8343 },
  '西宁': { latitude: 36.6171, longitude: 101.7782 },
  '青海湖': { latitude: 36.8968, longitude: 100.1848 },
  '茶卡镇': { latitude: 36.7915, longitude: 99.0789 },
  '祁连县': { latitude: 38.1766, longitude: 100.2471 },
  '门源县': { latitude: 37.3760, longitude: 101.6200 }
};

const checklistSeed = [
  ['证件与订单', ['身份证', '驾驶证', '机票或车票订单', '租车订单与保险', '酒店订单']],
  ['衣物', ['保暖内层', '抓绒或薄羽绒', '防风防水外套', '帽子和手套', '舒适防滑鞋']],
  ['健康防护', ['常用药', '防晒霜 SPF50+', '墨镜和润唇膏', '保温杯', '高能量零食']],
  ['电子设备', ['手机充电器', '充电宝', '车载充电器', '离线地图', '相机与备用电池']],
  ['车辆装备', ['检查轮胎与备胎', '确认道路救援范围', '三角警示牌', '玻璃水与纸巾', '垃圾袋']],
];

const expenseCategories = ['交通', '住宿', '餐饮', '门票', '租车', '油费', '停车/过路', '购物', '其他'];
const bookingTypes = ['机票', '酒店', '租车', '门票', '餐饮', '其他'];
const itinerarySeed = [
  { date: '2026-09-29', title: '晚班机抵达西安', route: '乘飞机抵达西安', stay: '西安', weatherCity: '西安', notes: '抵达后入住休息，为次日上午高铁预留充足时间。' },
  { date: '2026-09-30', title: '上午高铁前往西宁', route: '西安 → 西宁（高铁）', stay: '西宁', weatherCity: '西宁', notes: '抵达西宁后在市区转转，注意放慢节奏适应海拔。' },
  { date: '2026-10-01', title: '青海湖与茶卡盐湖', route: '西宁 → 青海湖 → 茶卡盐湖', stay: '茶卡镇', weatherCity: '茶卡镇', notes: '' },
  { date: '2026-10-02', title: '前往祁连', route: '茶卡镇 → 祁连', stay: '祁连县', weatherCity: '祁连县', notes: '' },
  { date: '2026-10-03', title: '卓尔山与大草原', route: '祁连 → 卓尔山 → 大草原 → 祁连', stay: '祁连县', weatherCity: '祁连县', notes: '' },
  { date: '2026-10-04', title: '雪山与门源', route: '祁连 → 雪山 → 门源', stay: '门源县', weatherCity: '门源县', notes: '' },
  { date: '2026-10-05', title: '返回兰州', route: '门源 → 西宁 → 兰州', stay: '兰州', weatherCity: '兰州', notes: '' },
  { date: '2026-10-06', title: '兰州休息，前往机场', route: '兰州市区 → 机场', stay: '回家', weatherCity: '兰州', notes: '' }
];
const routeStopsSeed = [
  { id: 'xian', name: '西安', date: '2026-09-29', dateLabel: '9月29日', lat: 34.3416, lon: 108.9398, note: '晚班机抵达西安，入住休息。' },
  { id: 'xining', name: '西宁', date: '2026-09-30', dateLabel: '9月30日', lat: 36.6171, lon: 101.7782, note: '上午乘高铁抵达，下午市区活动。' },
  { id: 'qinghai-lake', name: '青海湖', date: '2026-10-01', dateLabel: '10月1日', lat: 36.8968, lon: 100.1848, mapDx: 4, note: '从西宁出发，沿湖游览。' },
  { id: 'chaka', name: '茶卡盐湖', date: '2026-10-01', dateLabel: '10月1日', lat: 36.7915, lon: 99.0789, mapDx: -1, note: '游览盐湖，当晚住茶卡镇。' },
  { id: 'qilian', name: '祁连 · 卓尔山', date: '2026-10-03', dateLabel: '10月2—3日', lat: 38.1766, lon: 100.2471, note: '祁连、卓尔山与大草原，两日合并为一个打卡点。' },
  { id: 'menyuan', name: '门源', date: '2026-10-04', dateLabel: '10月4日', lat: 37.3760, lon: 101.6200, note: '途经雪山前往门源，住门源县。' },
  { id: 'lanzhou', name: '兰州', date: '2026-10-05', dateLabel: '10月5—6日', lat: 36.0611, lon: 103.8343, note: '从门源经西宁到兰州，休息后前往机场返程。' }
];
const pageTitles = {
  home: '旅行概览', plan: '每日行程', checklist: '出行清单', expenses: '花费记录', safety: '注意事项'
};

function uid(prefix = 'item') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function parseDate(value) {
  return new Date(`${value}T00:00:00`);
}

function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function dateRange(start, end) {
  const result = [];
  const cursor = parseDate(start);
  const last = parseDate(end);
  while (cursor <= last && result.length < 31) {
    result.push(isoDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

function defaultState() {
  const itinerary = itinerarySeed.map(day => ({ id: uid('day'), ...day }));
  const publicChecklistId = 'checklist-public';
  return {
    version: 8,
    meta: {
      title: '西安 → 青海 → 兰州',
      startDate: '2026-09-29',
      endDate: '2026-10-06',
      people: 1,
      budget: 0,
      emergencyContact: '',
      rentalContact: ''
    },
    itinerary,
    checklistLists: [{ id: publicChecklistId, name: '公共清单', type: 'public' }],
    checklist: checklistSeed.flatMap(([category, names]) => names.map((name, index) => ({
      id: uid('check'), listId: publicChecklistId, category, name, done: false,
      priority: (category === '证件与订单' && index < 4) || name === '确认道路救援范围'
    }))),
    expenses: [],
    bookings: [],
    checkins: {},
    mapStops: routeStopsSeed.map(stop => ({ ...stop, dayId: itinerary.find(day => day.date === stop.date)?.id || '' }))
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const defaults = defaultState();
    if (!saved || !saved.meta || !Array.isArray(saved.itinerary)) return defaults;
    const savedVersion = Number(saved.version) || 1;
    let migrated = { ...defaults, ...saved, meta: { ...defaults.meta, ...saved.meta } };
    if (savedVersion < 2) {
      migrated = {
        ...defaults,
        ...saved,
        meta: {
          ...defaults.meta,
          ...saved.meta,
          title: defaults.meta.title,
          startDate: defaults.meta.startDate,
          endDate: defaults.meta.endDate
        },
        itinerary: defaults.itinerary
      };
    }
    if (savedVersion < 3) {
      const seedByDate = Object.fromEntries(defaults.itinerary.map(day => [day.date, day]));
      migrated.itinerary = migrated.itinerary.map(day => ({
        ...day,
        weatherCity: day.weatherCity || seedByDate[day.date]?.weatherCity || '西宁'
      }));
    }
    if (savedVersion < 4) {
      const revisedDays = Object.fromEntries(defaults.itinerary.slice(0, 2).map(day => [day.date, day]));
      migrated.meta.title = defaults.meta.title;
      migrated.itinerary = migrated.itinerary.map(day => revisedDays[day.date] ? { ...day, ...revisedDays[day.date], id: day.id } : day);
    }
    if (savedVersion < 5 || !migrated.checkins) migrated.checkins = {};
    if (savedVersion < 6 || !Array.isArray(migrated.mapStops)) migrated.mapStops = defaults.mapStops;
    if (savedVersion < 7 || migrated.mapStops.some(stop => !stop.dayId)) {
      migrated.mapStops = migrated.mapStops.map(stop => ({
        ...stop,
        dayId: stop.dayId || migrated.itinerary.find(day => day.date === stop.date)?.id || ''
      }));
    }
    if (savedVersion < 8 || !Array.isArray(migrated.checklistLists) || !migrated.checklistLists.length) {
      migrated.checklistLists = defaults.checklistLists;
      migrated.checklist = (Array.isArray(migrated.checklist) ? migrated.checklist : defaults.checklist)
        .map(item => ({ ...item, listId: item.listId || defaults.checklistLists[0].id }));
    }
    migrated.version = 8;
    return migrated;
  } catch {
    return defaultState();
  }
}

let state = defaultState();
let activeSubmit = null;
let activeBusyLabel = '正在保存…';
let weatherCache = loadWeatherCache();
let weatherData = weatherCache.data;
let photoRecords = [];
let selectedMapStopId = state.mapStops?.[0]?.id || routeStopsSeed[0].id;
let routeMapInstance = null;
let routeMapMarkers = [];
let routeMapLines = [];
let routeBaseLayer = null;
let routeTileErrorCount = 0;
let geocodeCache = loadGeocodeCache();
const photoObjectUrls = new Map();
const cloudConfig = window.TRIP_CLOUD_CONFIG || {};
const cloudQuery = new URLSearchParams(location.search);
let cloudTripId = cloudQuery.get('trip') || '';
let cloudEditKey = cloudQuery.get('key') || '';
let cloudRevision = 0;
let cloudUpdatedAt = '';
let cloudDirty = false;
let cloudSyncing = false;
let cloudAccessVerified = false;
let cloudSaveTimer = null;
let cloudPollTimer = null;
let photoRefreshing = false;

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function money(value) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 2 }).format(Number(value) || 0);
}

function shortMoney(value) {
  return `¥${new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 }).format(Number(value) || 0)}`;
}

function formatDate(value, mode = 'full') {
  const date = parseDate(value);
  if (Number.isNaN(date.getTime())) return value;
  if (mode === 'day') return `${date.getMonth() + 1}月${date.getDate()}日`;
  if (mode === 'monthDay') return `${date.getMonth() + 1}.${String(date.getDate()).padStart(2, '0')}`;
  return new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' }).format(date);
}

function loadWeatherCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY));
    if (cached && cached.data && typeof cached.data === 'object') return cached;
  } catch { /* ignore an invalid cache */ }
  return { fetchedAt: 0, data: {} };
}

function weatherDescription(code) {
  if (code === 0) return { icon: '☀️', label: '晴朗' };
  if ([1, 2].includes(code)) return { icon: '🌤️', label: '晴间多云' };
  if (code === 3) return { icon: '☁️', label: '阴天' };
  if ([45, 48].includes(code)) return { icon: '🌫️', label: '有雾' };
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: '🌦️', label: '毛毛雨' };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: '🌧️', label: '有雨' };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: '❄️', label: '有雪' };
  if ([95, 96, 99].includes(code)) return { icon: '⛈️', label: '雷雨' };
  return { icon: '🌡️', label: '待确认' };
}

function weatherForDay(day) {
  return weatherData[`${day.weatherCity || '西宁'}|${day.date}`] || null;
}

function loadGeocodeCache() {
  try {
    return JSON.parse(localStorage.getItem(GEOCODE_CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

async function geocodePlace(place) {
  const query = String(place || '').trim();
  if (!query) throw new Error('请填写地点名称。');
  if (weatherLocations[query]) return { ...weatherLocations[query], displayName: query };
  if (geocodeCache[query]) return geocodeCache[query];

  const params = new URLSearchParams({ name: query, count: '8', language: 'zh', format: 'json' });
  let match = null;
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
    if (response.ok) {
      const result = await response.json();
      const matches = Array.isArray(result.results) ? result.results : [];
      match = matches.find(item => item.country_code === 'CN') || matches[0] || null;
    }
  } catch (error) {
    console.warn('城市地点搜索失败，尝试景点搜索。', error);
  }

  let location = match ? {
    latitude: Number(match.latitude),
    longitude: Number(match.longitude),
    displayName: [match.name, match.admin1, match.country].filter(Boolean).join(' · ')
  } : null;

  if (!location) {
    try {
      const photonParams = new URLSearchParams({ q: query, limit: '8' });
      const response = await fetch(`https://photon.komoot.io/api/?${photonParams}`);
      if (response.ok) {
        const result = await response.json();
        const features = Array.isArray(result.features) ? result.features : [];
        const feature = features.find(item => String(item.properties?.countrycode || '').toUpperCase() === 'CN') || features[0];
        if (feature?.geometry?.coordinates?.length >= 2) {
          location = {
            latitude: Number(feature.geometry.coordinates[1]),
            longitude: Number(feature.geometry.coordinates[0]),
            displayName: [feature.properties?.name, feature.properties?.state, feature.properties?.country].filter(Boolean).join(' · ')
          };
        }
      }
    } catch (error) {
      console.warn('景点地点搜索失败。', error);
    }
  }

  if (!location) throw new Error(`找不到“${query}”，请尝试输入“城市 + 省份”，例如“深圳 广东”。`);
  geocodeCache[query] = location;
  localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(geocodeCache));
  return location;
}

async function refreshWeather(force = false) {
  const hasCache = Object.keys(weatherData).length > 0;
  const cacheFresh = Date.now() - Number(weatherCache.fetchedAt || 0) < 3 * 60 * 60 * 1000;
  if (!force && hasCache && cacheFresh) {
    renderWeather();
    return;
  }

  $('#weatherStatus').textContent = '正在连接沿途气象站…';
  $('#refreshWeatherButton').disabled = true;
  const cityEntries = [...new Map(state.itinerary
    .filter(day => String(day.weatherCity || '').trim())
    .map(day => [day.weatherCity.trim(), day])).entries()];
  try {
    const responses = await Promise.all(cityEntries.map(async ([city, day]) => {
      const location = Number.isFinite(Number(day.weatherLat)) && Number.isFinite(Number(day.weatherLon))
        ? { latitude: Number(day.weatherLat), longitude: Number(day.weatherLon) }
        : await geocodePlace(city);
      const params = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
        timezone: 'Asia/Shanghai',
        forecast_days: '16'
      });
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      if (!response.ok) throw new Error(`天气服务返回 ${response.status}`);
      return { city, result: await response.json() };
    }));

    const nextWeather = {};
    responses.forEach(({ city, result }) => {
      const daily = result.daily || {};
      (daily.time || []).forEach((date, index) => {
        nextWeather[`${city}|${date}`] = {
          code: daily.weather_code?.[index],
          max: daily.temperature_2m_max?.[index],
          min: daily.temperature_2m_min?.[index],
          rain: daily.precipitation_probability_max?.[index],
          wind: daily.wind_speed_10m_max?.[index]
        };
      });
    });
    weatherCache = { fetchedAt: Date.now(), data: nextWeather };
    weatherData = nextWeather;
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weatherCache));
    renderWeather();
    renderItinerary();
  } catch (error) {
    $('#weatherStatus').textContent = hasCache ? '网络暂不可用，正在显示上次更新结果' : '暂时无法获取天气，请稍后刷新';
    if (!hasCache) renderWeather();
    console.warn(error);
  } finally {
    $('#refreshWeatherButton').disabled = false;
  }
}

function openPhotoDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PHOTO_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      const store = database.createObjectStore(PHOTO_STORE, { keyPath: 'id' });
      store.createIndex('dayId', 'dayId', { unique: false });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function refreshPhotoRecords() {
  if (!canEditTrip()) {
    photoRecords = [];
    renderItinerary();
    renderRouteMap();
    return;
  }
  if (photoRefreshing) return;
  photoRefreshing = true;
  try {
    const result = await photoApi('GET');
    const nextPhotos = Array.isArray(result?.photos) ? result.photos : [];
    const currentFingerprint = photoRecords.map(photo => `${photo.id}:${photo.dayId}:${photo.stopId}:${photo.name}:${photo.createdAt}`).join('|');
    const nextFingerprint = nextPhotos.map(photo => `${photo.id}:${photo.dayId}:${photo.stopId}:${photo.name}:${photo.createdAt}`).join('|');
    if (currentFingerprint !== nextFingerprint) {
      photoRecords = nextPhotos;
      renderItinerary();
      renderRouteMap();
    }
  } catch (error) {
    console.warn('无法读取云端照片', error);
  } finally {
    photoRefreshing = false;
  }
}

function photoUrl(photo) {
  if (photo.url) return photo.url;
  if (photo.blob && !photoObjectUrls.has(photo.id)) photoObjectUrls.set(photo.id, URL.createObjectURL(photo.blob));
  return photoObjectUrls.get(photo.id) || '';
}

async function compressPhoto(file) {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const attempts = [[1800, .84], [1600, .78], [1400, .72], [1200, .68]];
  try {
    for (const [maxSide, quality] of attempts) {
      const ratio = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
      canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
      const context = canvas.getContext('2d', { alpha: false });
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise((resolve, reject) => canvas.toBlob(
        value => value ? resolve(value) : reject(new Error('照片压缩失败')),
        'image/jpeg', quality
      ));
      if (blob.size <= PHOTO_MAX_BYTES) return blob;
    }
    throw new Error('照片压缩后仍超过 2 MB');
  } finally {
    bitmap.close();
  }
}

async function addPhotos(dayId, files, stopId = '') {
  if (!canEditTrip()) return showToast('公开页面为只读展示');
  const selected = [...files].filter(file => file.type.startsWith('image/'));
  if (!selected.length) return showToast('请选择图片文件');
  showToast(`正在处理 ${selected.length} 张照片…`);
  let savedCount = 0;
  for (const file of selected) {
    if (file.size > 30 * 1024 * 1024) continue;
    try {
      const blob = await compressPhoto(file);
      const form = new FormData();
      form.append('file', blob, 'photo.jpg');
      form.append('dayId', dayId);
      form.append('stopId', stopId);
      form.append('name', file.name);
      const result = await photoApi('POST', { body: form });
      if (result?.photo) photoRecords.push(result.photo);
      savedCount += 1;
    } catch (error) {
      console.warn(`无法处理 ${file.name}`, error);
    }
  }
  renderItinerary();
  renderRouteMap();
  showToast(savedCount === selected.length ? `已保存 ${savedCount} 张照片` : `已保存 ${savedCount} 张，部分照片处理失败`);
}

async function deletePhoto(id) {
  if (!canEditTrip()) return showToast('公开页面为只读展示');
  await photoApi('DELETE', { query: { id } });
  photoRecords = photoRecords.filter(photo => photo.id !== id);
  if (photoObjectUrls.has(id)) URL.revokeObjectURL(photoObjectUrls.get(id));
  photoObjectUrls.delete(id);
  renderItinerary();
  renderRouteMap();
  showToast('照片已删除');
}

function tripDays() {
  const start = parseDate(state.meta.startDate);
  const end = parseDate(state.meta.endDate);
  return Math.max(1, Math.round((end - start) / 86400000) + 1);
}

function saveState(message) {
  if (!canEditTrip()) {
    showToast('公开页面为只读展示，请使用完整协作链接编辑');
    renderAll();
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
  scheduleCloudSave();
  if (message) showToast(message);
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function isCloudConfigured() {
  return /^https:\/\//.test(String(cloudConfig.supabaseUrl || ''))
    && String(cloudConfig.supabaseAnonKey || '').length > 20;
}

function hasSharedTrip() {
  return isCloudConfigured() && Boolean(cloudTripId && cloudEditKey);
}

function canEditTrip() {
  return hasSharedTrip() && cloudAccessVerified;
}

const editControlSelector = [
  '#settingsButton', '#importButton', '#addDayButton', '#addChecklistButton',
  '#addExpenseButton', '#editContactsButton', '#clearExpensesButton',
  '[data-edit-day]', '[data-delete-day]', '[data-add-booking-day]',
  '[data-edit-booking]', '[data-delete-booking]', '[data-delete-photo]',
  '.photo-upload-button', '[data-add-map-stop]', '[data-edit-map-stop]',
  '[data-toggle-checkin]', '[data-delete-map-stop]', '[data-delete-check]',
  '[data-delete-expense]', '[data-add-checklist-item]', '[data-edit-checklist-list]',
  '[data-delete-checklist-list]'
].join(',');

function applyAccessMode() {
  const editable = canEditTrip();
  document.body.classList.toggle('read-only', !editable);
  const badge = $('#accessBadge');
  if (badge) {
    badge.textContent = editable ? '协作编辑' : '只读展示';
    badge.classList.toggle('editable', editable);
  }
  $$(editControlSelector).forEach(control => { control.hidden = !editable; });
  $$('[data-check-toggle]').forEach(input => { input.disabled = !editable; });
  const expenseJump = $('[data-jump="expenses"]');
  if (expenseJump) expenseJump.textContent = editable ? '记一笔' : '查看花费';
  const planJump = $('[data-jump="plan"]');
  if (planJump) planJump.textContent = editable ? '编辑行程' : '查看行程';
}

function updateCloudButton(status = 'local') {
  const button = $('#cloudButton');
  if (!button) return;
  button.classList.remove('synced', 'syncing', 'error');
  if (status === 'syncing') {
    button.textContent = '同步中…';
    button.classList.add('syncing');
  } else if (status === 'synced') {
    button.textContent = '✓ 协作编辑';
    button.classList.add('synced');
  } else if (status === 'error') {
    button.textContent = '同步失败';
    button.classList.add('error');
  } else if (isCloudConfigured()) {
    button.textContent = '创建协作副本';
  } else {
    button.textContent = '仅本机';
  }
}

function buildShareUrl() {
  const url = new URL(location.href);
  url.search = '';
  url.searchParams.set('trip', cloudTripId);
  url.searchParams.set('key', cloudEditKey);
  url.hash = location.hash || '#home';
  return url.toString();
}

function renderShareDialog() {
  const description = $('#shareDescription');
  const configHelp = $('#shareConfigHelp');
  const linkBox = $('#shareLinkBox');
  const createButton = $('#createShareButton');
  const copyButton = $('#copyShareButton');
  const syncButton = $('#syncNowButton');
  if (!description) return;

  configHelp.hidden = isCloudConfigured();
  linkBox.hidden = !hasSharedTrip();
  createButton.hidden = !isCloudConfigured() || hasSharedTrip();
  copyButton.hidden = !hasSharedTrip();
  syncButton.hidden = !hasSharedTrip();

  if (!isCloudConfigured()) {
    description.textContent = '网页已经具备多人同步能力，但还没有连接云端数据库。配置完成前，数据仍只保存在当前设备。';
  } else if (!hasSharedTrip()) {
    description.textContent = '公开页面始终只读。创建协作副本后会生成专属编辑链接，只有拿到完整链接的同行人才能修改。';
  } else {
    const time = cloudUpdatedAt ? new Date(cloudUpdatedAt).toLocaleString('zh-CN', { hour12: false }) : '等待首次同步';
    description.textContent = `这份行程正在自动同步。最近一次云端更新：${time}`;
    $('#shareLinkInput').value = buildShareUrl();
  }
}

function openShareDialog() {
  renderShareDialog();
  $('#shareDialog').showModal();
}

async function cloudRpc(name, payload) {
  if (!isCloudConfigured()) throw new Error('云端尚未配置。');
  const baseUrl = String(cloudConfig.supabaseUrl).replace(/\/$/, '');
  const apiKey = String(cloudConfig.supabaseAnonKey);
  const response = await fetch(`${baseUrl}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const text = await response.text();
  let result = null;
  try { result = text ? JSON.parse(text) : null; } catch { result = text; }
  if (!response.ok) {
    const detail = typeof result === 'object' ? result?.message : result;
    if (String(detail || '').includes('invalid_share_link')) throw new Error('共享链接无效或编辑密钥不正确。');
    throw new Error(detail || '云端服务暂时不可用。');
  }
  return result;
}

async function photoApi(method, { body, query } = {}) {
  if (!hasSharedTrip()) throw new Error('请先创建共享行程。');
  const baseUrl = String(cloudConfig.supabaseUrl).replace(/\/$/, '');
  const apiKey = String(cloudConfig.supabaseAnonKey);
  const url = new URL(`${baseUrl}/functions/v1/${PHOTO_FUNCTION_NAME}`);
  Object.entries(query || {}).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, {
    method,
    headers: {
      apikey: apiKey,
      'x-trip-id': cloudTripId,
      'x-trip-key': cloudEditKey
    },
    body
  });
  const text = await response.text();
  let result = null;
  try { result = text ? JSON.parse(text) : null; } catch { result = text; }
  if (!response.ok) {
    const detail = typeof result === 'object' ? result?.error : result;
    throw new Error(detail || '照片服务暂时不可用。');
  }
  return result;
}

function normalizeCloudState(value) {
  const defaults = defaultState();
  if (!value?.meta || !Array.isArray(value.itinerary) || !Array.isArray(value.checklist)) throw new Error('云端行程数据格式不正确。');
  const checklistLists = Array.isArray(value.checklistLists) && value.checklistLists.length
    ? value.checklistLists
    : defaults.checklistLists;
  const checklistListIds = new Set(checklistLists.map(list => list.id));
  const fallbackListId = checklistLists[0].id;
  return {
    ...defaults,
    ...value,
    version: 8,
    meta: { ...defaults.meta, ...value.meta },
    checklistLists,
    checklist: value.checklist.map(item => ({
      ...item,
      listId: checklistListIds.has(item.listId) ? item.listId : fallbackListId
    })),
    expenses: Array.isArray(value.expenses) ? value.expenses : [],
    bookings: Array.isArray(value.bookings) ? value.bookings : [],
    checkins: value.checkins && typeof value.checkins === 'object' ? value.checkins : {},
    mapStops: Array.isArray(value.mapStops) ? value.mapStops : defaults.mapStops
  };
}

async function pullCloudState({ initial = false, notify = false } = {}) {
  if (!hasSharedTrip() || cloudSyncing || cloudDirty || $('#formDialog')?.open) return;
  cloudSyncing = true;
  updateCloudButton('syncing');
  try {
    const result = await cloudRpc('get_shared_trip', { p_trip_id: cloudTripId, p_edit_key: cloudEditKey });
    const remoteRevision = Number(result?.revision || 0);
    if (initial || remoteRevision > cloudRevision) {
      state = normalizeCloudState(result.data);
      cloudRevision = remoteRevision;
      cloudUpdatedAt = result.updated_at || '';
      selectedMapStopId = state.mapStops?.some(stop => stop.id === selectedMapStopId) ? selectedMapStopId : state.mapStops?.[0]?.id || '';
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      cloudAccessVerified = true;
      renderAll();
      refreshWeather();
      if (notify) showToast('已获取同行人的最新修改');
    }
    if (cloudAccessVerified) await refreshPhotoRecords();
    updateCloudButton('synced');
  } catch (error) {
    console.warn(error);
    cloudAccessVerified = false;
    applyAccessMode();
    updateCloudButton('error');
    if (initial || notify) showToast(error.message || '云端同步失败');
  } finally {
    cloudSyncing = false;
    renderShareDialog();
  }
}

async function pushCloudState({ notify = false } = {}) {
  if (!hasSharedTrip() || cloudSyncing) return;
  clearTimeout(cloudSaveTimer);
  cloudSyncing = true;
  updateCloudButton('syncing');
  try {
    const result = await cloudRpc('save_shared_trip', {
      p_trip_id: cloudTripId,
      p_edit_key: cloudEditKey,
      p_data: state
    });
    cloudRevision = Number(result?.revision || cloudRevision);
    cloudUpdatedAt = result?.updated_at || '';
    cloudDirty = false;
    updateCloudButton('synced');
    if (notify) showToast('已同步到共享行程');
  } catch (error) {
    console.warn(error);
    cloudDirty = true;
    updateCloudButton('error');
    if (notify) showToast(error.message || '云端同步失败');
  } finally {
    cloudSyncing = false;
    renderShareDialog();
  }
}

function scheduleCloudSave() {
  if (!hasSharedTrip()) return;
  cloudDirty = true;
  updateCloudButton('syncing');
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(() => pushCloudState(), 800);
}

function randomSecret(bytes = 24) {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return [...values].map(value => value.toString(16).padStart(2, '0')).join('');
}

async function createSharedTrip() {
  if (!isCloudConfigured() || cloudSyncing) return;
  cloudSyncing = true;
  updateCloudButton('syncing');
  $('#createShareButton').disabled = true;
  try {
    const nextTripId = crypto.randomUUID();
    const nextEditKey = randomSecret();
    const result = await cloudRpc('create_shared_trip', {
      p_trip_id: nextTripId,
      p_edit_key: nextEditKey,
      p_data: state
    });
    cloudTripId = nextTripId;
    cloudEditKey = nextEditKey;
    cloudAccessVerified = true;
    cloudRevision = Number(result?.revision || 1);
    cloudUpdatedAt = result?.updated_at || '';
    cloudDirty = false;
    const url = new URL(location.href);
    url.search = '';
    url.searchParams.set('trip', cloudTripId);
    url.searchParams.set('key', cloudEditKey);
    history.replaceState(null, '', `${url.pathname}${url.search}${location.hash || '#home'}`);
    startCloudPolling();
    updateCloudButton('synced');
    renderAll();
    refreshPhotoRecords();
    renderShareDialog();
    showToast('共享行程已创建');
  } catch (error) {
    console.warn(error);
    updateCloudButton('error');
    showToast(error.message || '创建共享行程失败');
  } finally {
    cloudSyncing = false;
    $('#createShareButton').disabled = false;
  }
}

function startCloudPolling() {
  clearInterval(cloudPollTimer);
  if (!hasSharedTrip()) return;
  cloudPollTimer = setInterval(() => pullCloudState(), 8000);
}

async function initializeCloudSync() {
  if (!isCloudConfigured()) {
    updateCloudButton('local');
    return;
  }
  if (!cloudTripId && !cloudEditKey) {
    updateCloudButton('local');
    return;
  }
  if (!cloudTripId || !cloudEditKey) {
    updateCloudButton('error');
    showToast('共享链接不完整');
    return;
  }
  await pullCloudState({ initial: true });
  startCloudPolling();
}

function setView(view) {
  const requested = view === 'bookings' ? 'plan' : view;
  const target = pageTitles[requested] ? requested : 'home';
  $$('[data-view-panel]').forEach(panel => {
    const active = panel.dataset.viewPanel === target;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
  $$('[data-view]').forEach(link => link.classList.toggle('active', link.dataset.view === target));
  $('#pageTitle').textContent = pageTitles[target];
  if (location.hash !== `#${target}`) history.replaceState(null, '', `#${target}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (target === 'plan') requestAnimationFrame(() => {
    initializeRouteMap();
    routeMapInstance?.invalidateSize();
  });
}

function renderWeather() {
  const strip = $('#weatherStrip');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const itemsWithForecast = state.itinerary.filter(day => weatherForDay(day)).length;
  strip.innerHTML = state.itinerary.map(day => {
    const forecast = weatherForDay(day);
    const city = day.weatherCity || '西宁';
    const descriptor = forecast ? weatherDescription(Number(forecast.code)) : { icon: '◌', label: '等待预报' };
    const isToday = isoDate(now) === day.date;
    return `<div class="weather-day ${isToday ? 'today' : ''}">
      <div class="weather-day-head"><strong>${formatDate(day.date, 'monthDay')}</strong><span>${esc(city)}</span></div>
      <span class="weather-icon" aria-hidden="true">${descriptor.icon}</span>
      <span class="weather-temp">${forecast ? `${Math.round(forecast.max)}° / ${Math.round(forecast.min)}°` : '— / —'}</span>
      <span class="weather-detail">${descriptor.label}${forecast ? ` · 降水 ${Math.round(forecast.rain || 0)}%` : ''}</span>
    </div>`;
  }).join('');

  if (itemsWithForecast) {
    const time = new Date(weatherCache.fetchedAt);
    $('#weatherStatus').textContent = `${itemsWithForecast}/${state.itinerary.length} 天已有预报 · ${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')} 更新`;
  } else {
    $('#weatherStatus').textContent = '尚未进入预报时段，临近出发后会自动显示';
  }
}

function renderHome() {
  const { meta } = state;
  $('#heroTitle').textContent = meta.title;
  $('#heroDates').textContent = `${formatDate(meta.startDate, 'day')} — ${formatDate(meta.endDate, 'day')} · ${tripDays()}天`;
  $('#partyMeta').textContent = `${meta.people || 1} 人同行`;
  $('#budgetMeta').textContent = meta.budget > 0 ? `预算 ${shortMoney(meta.budget)}` : '预算待设置';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = parseDate(meta.startDate);
  const end = parseDate(meta.endDate);
  const daysAway = Math.ceil((start - today) / 86400000);
  if (today > end) {
    $('#countdownNumber').textContent = '✓';
    $('#countdownText').textContent = '旅程已结束';
  } else if (daysAway <= 0) {
    $('#countdownNumber').textContent = Math.max(1, Math.ceil((today - start) / 86400000) + 1);
    $('#countdownText').textContent = '旅程进行中';
  } else {
    $('#countdownNumber').textContent = daysAway;
    $('#countdownText').textContent = '天后出发';
  }

  const checked = state.checklist.filter(item => item.done).length;
  const total = state.checklist.length;
  const percent = total ? Math.round(checked / total * 100) : 0;
  const totalExpense = state.expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const confirmed = state.bookings.filter(item => item.status === '已确认').length;
  $('#checklistStat').textContent = `${percent}%`;
  $('#expenseStat').textContent = shortMoney(totalExpense);
  $('#bookingStat').textContent = confirmed;

  const priorities = state.checklist.filter(item => item.priority && !item.done).slice(0, 5);
  const priorityList = $('#priorityList');
  priorityList.innerHTML = priorities.length ? priorities.map(item => `
    <label class="priority-item" data-check-row="${item.id}">
      <input type="checkbox" data-check-toggle="${item.id}">
      <span>${esc(item.name)}<small>${esc(state.checklistLists?.find(list => list.id === item.listId)?.name || '公共清单')}</small></span>
    </label>`).join('') : '<div class="empty-inline">优先事项已完成，继续保持。</div>';

  $('#budgetSpent').textContent = money(totalExpense);
  if (meta.budget > 0) {
    const used = Math.min(100, Math.round(totalExpense / meta.budget * 100));
    $('#budgetBar').style.width = `${used}%`;
    $('#budgetPercent').textContent = `已使用 ${used}%`;
    $('#budgetRemaining').textContent = `剩余 ${money(Math.max(0, meta.budget - totalExpense))}`;
  } else {
    $('#budgetBar').style.width = '0%';
    $('#budgetPercent').textContent = '尚未设置预算';
    $('#budgetRemaining').textContent = '';
  }

  $('#miniTimeline').innerHTML = state.itinerary.map(day => {
    const date = parseDate(day.date);
    const filled = day.title && day.title !== '待规划';
    return `<div class="mini-day ${filled ? 'filled' : ''}"><strong>${date.getDate()}</strong><span>${esc(day.title || '待规划')}</span><small>${esc(day.route || day.stay || '尚未填写')}</small></div>`;
  }).join('');
}

function renderItinerary() {
  const list = $('#itineraryList');
  if (!state.itinerary.length) {
    list.innerHTML = '<div class="empty-state"><strong>还没有行程</strong>点击“增加一天”开始规划。</div>';
    return;
  }
  list.innerHTML = [...state.itinerary].sort((a, b) => a.date.localeCompare(b.date)).map((day, index) => {
    const date = parseDate(day.date);
    const week = new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(date);
    const forecast = weatherForDay(day);
    const descriptor = forecast ? weatherDescription(Number(forecast.code)) : null;
    const dayPhotos = photoRecords.filter(photo => photo.dayId === day.id).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    const dayBookings = state.bookings.filter(item => item.date === day.date);
    const dayStops = getMapStops().filter(stop => stop.dayId === day.id || (!stop.dayId && stop.date === day.date));
    return `<article class="day-card" id="day-${esc(day.id)}">
      <div class="day-date"><strong>${String(date.getDate()).padStart(2, '0')}</strong><span>${date.getMonth() + 1}月 · ${week}</span></div>
      <div class="day-content">
        <h3>Day ${index + 1} · ${esc(day.title || '待规划')}</h3>
        ${day.route ? `<p class="route-line">路线：${esc(day.route)}</p>` : '<p>路线待填写</p>'}
        ${day.notes ? `<p>${esc(day.notes)}</p>` : ''}
        <div class="day-chips">
          ${day.stay ? `<span class="day-chip">⌂ 住 ${esc(day.stay)}</span>` : ''}
          <span class="day-chip weather">${descriptor ? `${descriptor.icon} ${esc(day.weatherCity)} ${Math.round(forecast.max)}°/${Math.round(forecast.min)}°` : `◌ ${esc(day.weatherCity || '西宁')}天气待更新`}</span>
          ${dayStops.map(stop => `<button class="day-chip map-link" data-view-map-stop="${stop.id}">⌖ ${esc(stop.name)}</button>`).join('')}
        </div>
      </div>
      <div class="day-actions">
        <button class="icon-button" data-edit-day="${day.id}" aria-label="编辑这一天">✎</button>
        <button class="icon-button" data-delete-day="${day.id}" aria-label="删除这一天">×</button>
      </div>
      <div class="day-booking-section">
        <div class="day-section-label">
          <span>酒店 · 门票 · 交通</span>
          <button class="text-button" data-add-booking-day="${day.date}">＋ 添加预订</button>
        </div>
        <div class="day-booking-list">
          ${dayBookings.length ? dayBookings.map(item => `<div class="day-booking-item">
            <span class="day-booking-type">${esc(item.type.slice(0, 1))}</span>
            <div class="day-booking-main">
              <strong>${esc(item.name)}</strong>
              <small>${esc(item.type)}${item.code ? ` · 订单 ${esc(item.code)}` : ''}${item.note ? ` · ${esc(item.note)}` : ''}</small>
            </div>
            <span class="status-badge ${item.status === '待确认' ? 'pending' : ''}">${esc(item.status)}</span>
            <div class="day-booking-actions">
              <button class="text-button" data-edit-booking="${item.id}" aria-label="编辑 ${esc(item.name)}">编辑</button>
              <button class="text-button danger" data-delete-booking="${item.id}" aria-label="删除 ${esc(item.name)}">删除</button>
            </div>
          </div>`).join('') : '<div class="empty-booking">尚未添加当天预订，可记录酒店、门票、航班或高铁信息。</div>'}
        </div>
      </div>
      <div class="day-photo-section">
        <div class="day-photo-label"><span>旅途照片</span><span>共 ${dayPhotos.length} 张</span></div>
        <div class="photo-grid">
          ${dayPhotos.map(photo => `<div class="photo-item">
            <button data-view-photo="${photo.id}" aria-label="查看 ${esc(photo.name)}"><img src="${photoUrl(photo)}" alt="${esc(photo.name)}" loading="lazy"></button>
            <button class="photo-delete" data-delete-photo="${photo.id}" aria-label="删除 ${esc(photo.name)}">×</button>
          </div>`).join('')}
          <label class="photo-upload-button"><strong>＋</strong><span>添加照片</span><input type="file" accept="image/*" multiple data-photo-input="${day.id}" hidden></label>
        </div>
      </div>
    </article>`;
  }).join('');
}

function routeMarkerHtml(stop, index) {
  const checked = Boolean(state.checkins?.[stop.id]);
  const selected = selectedMapStopId === stop.id;
  const count = photoRecords.filter(photo => photo.stopId === stop.id).length;
  return `<div class="leaflet-trip-marker ${checked ? 'checked' : ''} ${selected ? 'selected' : ''}">
    <span class="leaflet-trip-pin"><span>${checked ? '✓' : index + 1}</span></span>
    <span class="leaflet-trip-label">${esc(stop.name)}</span>
    ${count ? `<span class="leaflet-trip-photo-count">${count}</span>` : ''}
  </div>`;
}

function getMapStops() {
  return Array.isArray(state.mapStops) ? state.mapStops : routeStopsSeed;
}

function getMapStopDay(stop) {
  return state.itinerary.find(day => day.id === stop.dayId) || state.itinerary.find(day => day.date === stop.date);
}

function getMapStopDateLabel(stop) {
  const day = getMapStopDay(stop);
  const oldAutomaticLabel = stop.date && stop.dateLabel === formatDate(stop.date, 'day');
  if (day && (!stop.dateLabel || oldAutomaticLabel)) return formatDate(day.date, 'day');
  return stop.dateLabel || '未关联日期';
}

function refreshRouteMapPath() {
  if (!routeMapInstance || !window.L) return;
  routeMapLines.forEach(line => line.remove());
  routeMapLines = [];
  const coordinates = getMapStops().map(stop => [Number(stop.lat), Number(stop.lon)]);
  if (coordinates.length < 2) return;
  routeMapLines = [
    L.polyline(coordinates, { color: '#ffffff', weight: 8, opacity: .92, lineCap: 'round', lineJoin: 'round' }).addTo(routeMapInstance),
    L.polyline(coordinates, { color: '#d96f45', weight: 4, opacity: .95, lineCap: 'round', lineJoin: 'round' }).addTo(routeMapInstance)
  ];
}

function focusRouteMap() {
  if (!routeMapInstance || !window.L) return;
  const coordinates = getMapStops().map(stop => [Number(stop.lat), Number(stop.lon)]);
  if (!coordinates.length) return routeMapInstance.setView([36.6, 101.8], 6);
  if (coordinates.length === 1) return routeMapInstance.setView(coordinates[0], 8);
  routeMapInstance.fitBounds(L.latLngBounds(coordinates), { padding: [34, 34] });
}

function refreshRouteMapMarkers() {
  if (!routeMapInstance || !window.L) return;
  routeMapMarkers.forEach(marker => marker.remove());
  routeMapMarkers = getMapStops().map((stop, index) => {
    const marker = L.marker([stop.lat, stop.lon], {
      title: `${stop.name} · ${getMapStopDateLabel(stop)}`,
      alt: stop.name,
      keyboard: true,
      draggable: false,
      zIndexOffset: selectedMapStopId === stop.id ? 1000 : index * 10,
      icon: L.divIcon({
        className: 'trip-div-icon',
        html: routeMarkerHtml(stop, index),
        iconSize: [46, 56],
        iconAnchor: [23, 28]
      })
    }).addTo(routeMapInstance);
    marker.on('click', () => {
      selectedMapStopId = stop.id;
      routeMapInstance.panTo([stop.lat, stop.lon], { animate: true, duration: .45 });
      renderRouteMap();
    });
    return marker;
  });
}

function addRouteBaseLayer(useBackup = false) {
  if (!routeMapInstance || !window.L) return;
  if (routeBaseLayer) routeBaseLayer.remove();
  routeTileErrorCount = 0;

  if (!useBackup && window.maplibregl && typeof L.maplibreGL === 'function') {
    routeBaseLayer = L.maplibreGL({
      style: 'https://tiles.openfreemap.org/styles/positron',
      interactive: false
    }).addTo(routeMapInstance);
    const vectorMap = routeBaseLayer.getMap?.();
    vectorMap?.once('load', () => {
      const badge = $('#routeMapBadge');
      if (badge) badge.textContent = '轻量矢量地图 · 可缩放拖动';
    });
    vectorMap?.on('error', () => {
      routeTileErrorCount += 1;
      if (routeTileErrorCount === 4) addRouteBaseLayer(true);
    });
    return;
  }

  const transparentTile = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  const source = 'https://tile.top-o-map.com/relief/{z}/{x}/{y}.png';
  routeBaseLayer = L.tileLayer(source, {
    maxZoom: 17,
    errorTileUrl: transparentTile,
    attribution: '备用地图 © OpenStreetMap 贡献者 · © OpenTopoMap'
  });
  routeBaseLayer.on('tileerror', () => {
    routeTileErrorCount += 1;
    const badge = $('#routeMapBadge');
    if (routeTileErrorCount >= 3 && badge) badge.textContent = '地图网络暂不可用';
  });
  const badge = $('#routeMapBadge');
  if (badge) badge.textContent = '备用地形图 · 可缩放拖动';
  routeBaseLayer.addTo(routeMapInstance);
  routeBaseLayer.bringToBack();
}

function initializeRouteMap() {
  const canvas = $('#routeMapCanvas');
  if (routeMapInstance || !canvas || !canvas.offsetWidth || !window.L) return;
  routeMapInstance = L.map(canvas, {
    zoomControl: false,
    attributionControl: true,
    scrollWheelZoom: false,
    zoomSnap: .25,
    zoomDelta: .5,
    minZoom: 4,
    maxZoom: 13
  });
  L.control.zoom({ position: 'bottomright' }).addTo(routeMapInstance);
  addRouteBaseLayer();
  refreshRouteMapPath();
  focusRouteMap();
  refreshRouteMapMarkers();
}

function renderRouteMap() {
  const detail = $('#mapStopDetail');
  if (!detail) return;
  const stops = getMapStops();
  const checkedCount = stops.filter(stop => state.checkins?.[stop.id]).length;
  $('#mapCheckinCount').textContent = `${checkedCount} / ${stops.length}`;
  initializeRouteMap();
  refreshRouteMapPath();
  refreshRouteMapMarkers();
  if (!stops.length) {
    detail.innerHTML = '<div class="empty-state"><strong>地图上还没有地点</strong>点击“添加地点”开始规划路线。</div>';
    return;
  }
  const stop = stops.find(item => item.id === selectedMapStopId) || stops[0];
  selectedMapStopId = stop.id;
  const checked = Boolean(state.checkins?.[stop.id]);
  const stopPhotos = photoRecords.filter(photo => photo.stopId === stop.id).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const day = getMapStopDay(stop);
  const sortedDays = [...state.itinerary].sort((a, b) => a.date.localeCompare(b.date));
  const dayNumber = day ? sortedDays.findIndex(item => item.id === day.id) + 1 : 0;
  detail.innerHTML = `<div class="map-detail-copy">
      <p class="eyebrow">${esc(getMapStopDateLabel(stop))} · STOP ${stops.indexOf(stop) + 1}</p>
      <h3>${esc(stop.name)}</h3>
      <p>${esc(stop.note)}</p>
      ${day ? `<button class="map-linked-itinerary" data-view-itinerary-day="${day.id}"><span>关联行程</span><strong>Day ${dayNumber} · ${esc(day.title)}</strong><small>${esc(day.route || '路线待填写')}</small></button>` : '<span class="map-unlinked-warning">尚未关联每日行程</span>'}
      <small>位置由地点名称自动匹配；如需调整，请编辑地点名称</small>
    </div>
    <div class="map-detail-actions">
      <button class="secondary-button" data-edit-map-stop="${stop.id}">编辑地点</button>
      <button class="${checked ? 'secondary-button' : 'primary-button'} map-checkin-button" data-toggle-checkin="${stop.id}">${checked ? '✓ 已打卡' : '到达后打卡'}</button>
      <button class="text-button danger" data-delete-map-stop="${stop.id}">删除</button>
    </div>
    <div class="map-stop-photos">
      <div class="day-photo-label"><span>这个地点的照片</span><span>共 ${stopPhotos.length} 张</span></div>
      <div class="photo-grid map-photo-grid">
        ${stopPhotos.map(photo => `<div class="photo-item">
          <button data-view-photo="${photo.id}" aria-label="查看 ${esc(photo.name)}"><img src="${photoUrl(photo)}" alt="${esc(photo.name)}" loading="lazy"></button>
          <button class="photo-delete" data-delete-photo="${photo.id}" aria-label="删除 ${esc(photo.name)}">×</button>
        </div>`).join('')}
        ${day ? `<label class="photo-upload-button"><strong>＋</strong><span>上传到此地点</span><input type="file" accept="image/*" multiple data-photo-input="${day.id}" data-photo-stop="${stop.id}" hidden></label>` : '<div class="empty-booking">找不到对应日期，请先补充当天行程。</div>'}
      </div>
    </div>`;
}

function renderChecklist() {
  const done = state.checklist.filter(item => item.done).length;
  const total = state.checklist.length;
  const percent = total ? Math.round(done / total * 100) : 0;
  $('#checklistDoneText').textContent = `${done} / ${total}`;
  $('#checklistBar').style.width = `${percent}%`;
  const lists = Array.isArray(state.checklistLists) && state.checklistLists.length
    ? state.checklistLists
    : [{ id: 'checklist-public', name: '公共清单', type: 'public' }];
  $('#checklistSummary').textContent = total
    ? `${lists.length} 份共享清单 · 已完成 ${percent}%，还有 ${total - done} 项。`
    : `${lists.length} 份共享清单，开始添加物品吧。`;

  $('#checklistGroups').innerHTML = lists.map(list => {
    const listItems = state.checklist.filter(item => item.listId === list.id);
    const listDone = listItems.filter(item => item.done).length;
    const listPercent = listItems.length ? Math.round(listDone / listItems.length * 100) : 0;
    const categories = [...new Set(listItems.map(item => item.category))];
    const categoryHtml = categories.length ? categories.map(category => {
      const items = listItems.filter(item => item.category === category);
      const count = items.filter(item => item.done).length;
      return `<section class="check-group">
        <div class="check-group-head"><h4>${esc(category)}</h4><span>${count}/${items.length}</span></div>
        ${items.map(item => `<div class="check-row ${item.done ? 'checked' : ''}">
          <input id="${item.id}" type="checkbox" data-check-toggle="${item.id}" ${item.done ? 'checked' : ''}>
          <label for="${item.id}">${esc(item.name)}</label>
          <button class="delete-mini" data-delete-check="${item.id}" aria-label="删除 ${esc(item.name)}">×</button>
        </div>`).join('')}
      </section>`;
    }).join('') : '<div class="empty-checklist-list">这份清单还没有物品。</div>';

    return `<article class="checklist-board" data-checklist-list="${list.id}">
      <div class="checklist-board-head">
        <div>
          <span class="checklist-kind">${list.type === 'public' ? '公共' : '按名字区分'}</span>
          <h3>${esc(list.name)}</h3>
          <p>${listDone}/${listItems.length} 已完成 · ${listPercent}%</p>
        </div>
        <div class="checklist-board-actions">
          <button class="secondary-button" data-add-checklist-item="${list.id}">＋ 添加物品</button>
          ${list.type !== 'public' ? `<button class="text-button" data-edit-checklist-list="${list.id}">改名</button><button class="text-button danger" data-delete-checklist-list="${list.id}">删除</button>` : ''}
        </div>
      </div>
      <div class="checklist-list-progress"><span style="width:${listPercent}%"></span></div>
      <div class="checklist-category-grid">${categoryHtml}</div>
    </article>`;
  }).join('');
}

function renderExpenses() {
  const expenses = [...state.expenses].sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt));
  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  $('#totalExpense').textContent = money(total);
  $('#remainingBudget').textContent = state.meta.budget > 0 ? money(state.meta.budget - total) : '未设置';
  $('#perPersonExpense').textContent = money(total / Math.max(1, Number(state.meta.people) || 1));
  $('#expenseList').innerHTML = expenses.length ? expenses.map(item => `<div class="expense-row">
    <span class="expense-dot">${esc(item.category.slice(0, 1))}</span>
    <div class="expense-main"><strong>${esc(item.name)}</strong><small>${formatDate(item.date, 'day')} · ${esc(item.payer || '未填付款人')} · ${esc(item.category)}</small></div>
    <span class="expense-amount">${money(item.amount)}</span>
    <button class="delete-mini" data-delete-expense="${item.id}" aria-label="删除这笔记录">×</button>
  </div>`).join('') : '<div class="empty-state"><strong>还没有花费记录</strong>从机票、租车或酒店开始记一笔。</div>';

  const sums = Object.fromEntries(expenseCategories.map(category => [category, 0]));
  expenses.forEach(item => { sums[item.category] = (sums[item.category] || 0) + Number(item.amount); });
  const categoryEntries = Object.entries(sums).filter(([, value]) => value > 0).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...categoryEntries.map(([, value]) => value));
  $('#categoryChart').innerHTML = categoryEntries.length ? categoryEntries.map(([category, value]) => `<div class="category-row">
    <div class="category-label"><span>${esc(category)}</span><strong>${money(value)}</strong></div>
    <div class="category-track"><span style="width:${Math.max(5, value / max * 100)}%"></span></div>
  </div>`).join('') : '<div class="empty-inline">记录后会自动生成分类统计。</div>';
}

function renderContacts() {
  $('#emergencyContactDisplay').textContent = state.meta.emergencyContact || '待填写';
  $('#rentalContactDisplay').textContent = state.meta.rentalContact || '待填写';
}

function renderAll() {
  const now = new Date();
  $('#todayLabel').textContent = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).format(now);
  renderHome();
  renderWeather();
  renderRouteMap();
  renderItinerary();
  renderChecklist();
  renderExpenses();
  renderContacts();
  applyAccessMode();
}

function openForm({ eyebrow = 'EDIT', title, fields, submitLabel = '保存', busyLabel = '正在保存…', onSubmit }) {
  $('#dialogEyebrow').textContent = eyebrow;
  $('#dialogTitle').textContent = title;
  $('#dialogSaveButton').textContent = submitLabel;
  $('#formError').textContent = '';
  $('#dialogFields').innerHTML = fields.map(field => {
    const classes = `field ${field.full ? 'full' : ''}`;
    const required = field.required ? 'required' : '';
    let control;
    if (field.type === 'select') {
      control = `<select id="field-${esc(field.name)}" name="${esc(field.name)}" ${required}>${field.options.map(option => {
        const value = typeof option === 'object' ? option.value : option;
        const label = typeof option === 'object' ? option.label : option;
        return `<option value="${esc(value)}" ${String(value) === String(field.value) ? 'selected' : ''}>${esc(label)}</option>`;
      }).join('')}</select>`;
    } else if (field.type === 'textarea') {
      control = `<textarea id="field-${esc(field.name)}" name="${esc(field.name)}" placeholder="${esc(field.placeholder || '')}" ${required}>${esc(field.value || '')}</textarea>`;
    } else {
      control = `<input id="field-${esc(field.name)}" name="${esc(field.name)}" type="${esc(field.type || 'text')}" value="${esc(field.value ?? '')}" placeholder="${esc(field.placeholder || '')}" ${field.min !== undefined ? `min="${esc(field.min)}"` : ''} ${field.step ? `step="${esc(field.step)}"` : ''} ${required}>`;
    }
    return `<div class="${classes}"><label for="field-${esc(field.name)}">${esc(field.label)}</label>${control}${field.hint ? `<small class="field-hint">${esc(field.hint)}</small>` : ''}</div>`;
  }).join('');
  activeSubmit = onSubmit;
  activeBusyLabel = busyLabel;
  $('#formDialog').showModal();
  requestAnimationFrame(() => $('#dialogFields input, #dialogFields select, #dialogFields textarea')?.focus());
}

function openSettings() {
  openForm({
    eyebrow: 'TRIP SETTINGS', title: '旅行设置', fields: [
      { name: 'title', label: '旅行名称', value: state.meta.title, required: true, full: true },
      { name: 'startDate', label: '出发日期', type: 'date', value: state.meta.startDate, required: true },
      { name: 'endDate', label: '返回日期', type: 'date', value: state.meta.endDate, required: true },
      { name: 'people', label: '同行人数', type: 'number', min: 1, value: state.meta.people, required: true },
      { name: 'budget', label: '总预算（元）', type: 'number', min: 0, step: '0.01', value: state.meta.budget }
    ],
    onSubmit(data) {
      if (data.endDate < data.startDate) throw new Error('返回日期不能早于出发日期。');
      const existing = Object.fromEntries(state.itinerary.map(item => [item.date, item]));
      const dates = dateRange(data.startDate, data.endDate);
      state.meta = { ...state.meta, title: data.title.trim(), startDate: data.startDate, endDate: data.endDate, people: Math.max(1, Number(data.people)), budget: Math.max(0, Number(data.budget) || 0) };
      state.itinerary = dates.map((date, index) => existing[date] || { id: uid('day'), date, title: index === 0 ? '出发日' : index === dates.length - 1 ? '返程日' : '待规划', route: '', stay: '', weatherCity: '西宁', notes: '' });
      saveState('旅行设置已更新');
    }
  });
}

function openDayForm(day) {
  const isNew = !day;
  const lastDate = state.itinerary.length ? [...state.itinerary].sort((a, b) => a.date.localeCompare(b.date)).at(-1).date : state.meta.startDate;
  const next = parseDate(lastDate);
  if (isNew) next.setDate(next.getDate() + (state.itinerary.length ? 1 : 0));
  const item = day || { date: isoDate(next), title: '待规划', route: '', stay: '', weatherCity: '西宁', notes: '' };
  openForm({
    eyebrow: 'ITINERARY', title: isNew ? '增加一天' : '编辑行程', busyLabel: '正在定位天气地点…', fields: [
      { name: 'date', label: '日期', type: 'date', value: item.date, required: true },
      { name: 'title', label: '当天主题', value: item.title, required: true },
      { name: 'route', label: '路线', value: item.route, placeholder: '例如：西宁 → 青海湖', full: true },
      { name: 'stay', label: '住宿', value: item.stay, placeholder: '酒店或城市', full: true },
      { name: 'weatherCity', label: '天气地点', value: item.weatherCity || '西宁', placeholder: '例如：深圳、茶卡镇', required: true, hint: '可自由输入城市或地区，保存后自动匹配天气位置。' },
      { name: 'notes', label: '备注', type: 'textarea', value: item.notes, placeholder: '出发时间、停车点、Plan B……', full: true }
    ],
    async onSubmit(data) {
      const weatherCity = data.weatherCity.trim();
      if (!weatherCity) throw new Error('请填写天气地点。');
      const weatherUnchanged = !isNew && weatherCity === day.weatherCity
        && Number.isFinite(Number(day.weatherLat)) && Number.isFinite(Number(day.weatherLon));
      const location = weatherUnchanged
        ? { latitude: Number(day.weatherLat), longitude: Number(day.weatherLon) }
        : await geocodePlace(weatherCity);
      const payload = {
        ...data,
        weatherCity,
        weatherLat: location.latitude,
        weatherLon: location.longitude
      };
      if (isNew) state.itinerary.push({ id: uid('day'), ...payload });
      else Object.assign(day, payload);
      state.itinerary.sort((a, b) => a.date.localeCompare(b.date));
      saveState(isNew ? '已增加一天' : '行程已保存');
      refreshWeather(true);
    }
  });
}

function openMapStopForm(stop) {
  const isNew = !stop;
  const stops = getMapStops();
  const sortedDays = [...state.itinerary].sort((a, b) => a.date.localeCompare(b.date));
  if (!sortedDays.length) return showToast('请先添加每日行程，再创建地图地点');
  const itineraryOptions = sortedDays.map((day, index) => ({
    value: day.id,
    label: `Day ${index + 1} · ${formatDate(day.date, 'day')} · ${day.title || '待规划'}`
  }));
  const selected = stops.find(item => item.id === selectedMapStopId);
  const center = routeMapInstance?.getCenter();
  const item = stop || {
    name: '',
    dayId: sortedDays[0].id,
    dateLabel: '',
    lat: center?.lat || selected?.lat || 36.6171,
    lon: center?.lng || selected?.lon || 101.7782,
    note: ''
  };
  const linkedDay = getMapStopDay(item) || sortedDays[0];
  const currentOrder = stop ? stops.indexOf(stop) + 1 : stops.length + 1;
  openForm({
    eyebrow: 'MAP STOP', title: isNew ? '添加地图地点' : '编辑地图地点', busyLabel: '正在查找地点…', fields: [
      { name: 'name', label: '地点名称（自动定位）', value: item.name, placeholder: '例如：深圳、青海湖', required: true, full: true, hint: '直接输入地名即可，系统会自动把地点放到地图上。' },
      { name: 'dayId', label: '关联每日行程', type: 'select', options: itineraryOptions, value: linkedDay.id, required: true, full: true },
      { name: 'order', label: '路线顺序', type: 'number', min: 1, value: currentOrder, required: true },
      { name: 'dateLabel', label: '日期显示（可选）', value: getMapStopDateLabel(item), placeholder: '例如：10月2—3日', full: true },
      { name: 'note', label: '地点备注', type: 'textarea', value: item.note, placeholder: '当天安排、住宿或打卡说明', full: true }
    ],
    submitLabel: isNew ? '添加到路线' : '保存地点',
    async onSubmit(data) {
      const name = data.name.trim();
      const selectedDay = state.itinerary.find(day => day.id === data.dayId);
      if (!name) throw new Error('请填写地点名称。');
      if (!selectedDay) throw new Error('请选择要关联的每日行程。');
      const nameUnchanged = stop && name === stop.name
        && Number.isFinite(Number(stop.lat)) && Number.isFinite(Number(stop.lon));
      const location = nameUnchanged
        ? { latitude: Number(stop.lat), longitude: Number(stop.lon) }
        : await geocodePlace(name);
      state.mapStops = [...getMapStops()];
      const dateLabelChangedWithDay = stop && data.dayId !== stop.dayId && data.dateLabel.trim() === stop.dateLabel;
      const payload = {
        name,
        dayId: selectedDay.id,
        date: selectedDay.date,
        dateLabel: !data.dateLabel.trim() || dateLabelChangedWithDay ? formatDate(selectedDay.date, 'day') : data.dateLabel.trim(),
        lat: location.latitude,
        lon: location.longitude,
        note: data.note.trim()
      };
      const targetOrder = Math.max(0, Math.min(state.mapStops.length, Number(data.order) - 1));
      let savedStop;
      if (isNew) {
        savedStop = { id: uid('stop'), ...payload };
        state.mapStops.splice(targetOrder, 0, savedStop);
      } else {
        const oldIndex = state.mapStops.findIndex(item => item.id === stop.id);
        savedStop = { ...state.mapStops[oldIndex], ...payload };
        state.mapStops.splice(oldIndex, 1);
        state.mapStops.splice(Math.min(targetOrder, state.mapStops.length), 0, savedStop);
      }
      selectedMapStopId = savedStop.id;
      saveState(isNew ? '地图地点已添加' : '地图地点已更新');
      requestAnimationFrame(() => {
        routeMapInstance?.panTo([savedStop.lat, savedStop.lon], { animate: true });
        refreshRouteMapPath();
      });
    }
  });
}

function openChecklistListForm(list) {
  const isNew = !list;
  openForm({
    eyebrow: 'SHARED CHECKLIST', title: isNew ? '新建共享清单' : '清单改名', fields: [
      { name: 'type', label: '清单类型', type: 'select', options: ['按名字区分', '公共清单'], value: list?.type === 'public' ? '公共清单' : '按名字区分', full: true },
      { name: 'name', label: '名字 / 清单名称', value: list?.type === 'named' ? list.name.replace(/的清单$/, '') : '', placeholder: '例如：小明、摄影装备', full: true, hint: '选“按名字区分”时会显示为“小明的清单”；所有同行人仍然可见并可编辑。' }
    ],
    submitLabel: isNew ? '创建清单' : '保存名称',
    onSubmit(data) {
      state.checklistLists ||= [];
      const isPublic = data.type === '公共清单';
      if (isPublic && state.checklistLists.some(item => item.type === 'public' && item.id !== list?.id)) {
        throw new Error('已经有一份公共清单，可直接在其中添加物品。');
      }
      const enteredName = data.name.trim();
      if (!isPublic && !enteredName) throw new Error('请填写名字或清单名称。');
      const name = isPublic
        ? '公共清单'
        : (/清单$/.test(enteredName) ? enteredName : `${enteredName}的清单`);
      const payload = { name, type: isPublic ? 'public' : 'named' };
      if (isNew) state.checklistLists.push({ id: uid('list'), ...payload });
      else Object.assign(list, payload);
      saveState(isNew ? '共享清单已创建' : '清单名称已更新');
    }
  });
}

function openChecklistItemForm(listId) {
  const list = state.checklistLists?.find(item => item.id === listId);
  if (!list) return showToast('找不到这份清单');
  const categories = [...new Set([...checklistSeed.map(item => item[0]), ...state.checklist.map(item => item.category)])];
  openForm({
    eyebrow: 'PACKING ITEM', title: `添加到“${list.name}”`, fields: [
      { name: 'name', label: '物品名称', required: true, full: true },
      { name: 'category', label: '分类', type: 'select', options: categories, value: categories[0] },
      { name: 'priority', label: '优先事项', type: 'select', options: ['否', '是'], value: '否' }
    ],
    submitLabel: '添加',
    onSubmit(data) {
      state.checklist.push({ id: uid('check'), listId, name: data.name.trim(), category: data.category, done: false, priority: data.priority === '是' });
      saveState(`已添加到“${list.name}”`);
    }
  });
}

function openExpenseForm() {
  openForm({
    eyebrow: 'NEW EXPENSE', title: '记一笔花费', fields: [
      { name: 'name', label: '项目', placeholder: '例如：往返机票', required: true, full: true },
      { name: 'amount', label: '金额（元）', type: 'number', min: 0.01, step: '0.01', required: true },
      { name: 'category', label: '类别', type: 'select', options: expenseCategories, value: '交通' },
      { name: 'date', label: '日期', type: 'date', value: isoDate(new Date()), required: true },
      { name: 'payer', label: '付款人', placeholder: '姓名或昵称' },
      { name: 'note', label: '备注', type: 'textarea', placeholder: '分摊方式、订单说明等', full: true }
    ],
    submitLabel: '保存记录',
    onSubmit(data) {
      state.expenses.push({ id: uid('expense'), ...data, amount: Number(data.amount), createdAt: new Date().toISOString() });
      saveState('花费已记录');
    }
  });
}

function openBookingForm(booking, presetDate) {
  const isNew = !booking;
  const item = booking || { type: '酒店', name: '', date: presetDate || state.meta.startDate, status: '待确认', code: '', note: '' };
  openForm({
    eyebrow: 'RESERVATION', title: isNew ? `添加 ${formatDate(item.date, 'day')}预订` : '编辑预订', fields: [
      { name: 'type', label: '类型', type: 'select', options: bookingTypes, value: item.type },
      { name: 'status', label: '状态', type: 'select', options: ['待确认', '已确认'], value: item.status },
      { name: 'name', label: '名称', value: item.name, placeholder: '航班、酒店或租车公司', required: true, full: true },
      { name: 'date', label: '日期', type: 'date', value: item.date, required: true },
      { name: 'code', label: '订单号（可选）', value: item.code },
      { name: 'note', label: '备注', type: 'textarea', value: item.note, placeholder: '时间、地址、退改期限等', full: true }
    ],
    onSubmit(data) {
      if (isNew) state.bookings.push({ id: uid('booking'), ...data });
      else Object.assign(booking, data);
      saveState(isNew ? '预订已添加' : '预订已更新');
    }
  });
}

function openContactForm() {
  openForm({
    eyebrow: 'EMERGENCY', title: '紧急联系信息', fields: [
      { name: 'emergencyContact', label: '紧急联系人', value: state.meta.emergencyContact, placeholder: '姓名 + 电话', full: true },
      { name: 'rentalContact', label: '租车道路救援', value: state.meta.rentalContact, placeholder: '公司 + 电话', full: true }
    ],
    onSubmit(data) {
      state.meta.emergencyContact = data.emergencyContact.trim();
      state.meta.rentalContact = data.rentalContact.trim();
      saveState('联系信息已保存');
    }
  });
}

$('#dynamicForm').addEventListener('submit', async event => {
  event.preventDefault();
  if (!canEditTrip()) {
    $('#formDialog').close();
    showToast('公开页面为只读展示');
    return;
  }
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const submitButton = $('#dialogSaveButton');
  const originalLabel = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = activeBusyLabel;
  $('#formError').textContent = '';
  try {
    if (activeSubmit) await activeSubmit(data);
    $('#formDialog').close();
  } catch (error) {
    $('#formError').textContent = error.message || '请检查填写内容。';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
  }
});

$$('[data-dialog-close]').forEach(button => button.addEventListener('click', () => $('#formDialog').close()));

document.addEventListener('click', event => {
  const viewLink = event.target.closest('[data-view], [data-jump]');
  if (viewLink) {
    event.preventDefault();
    const view = viewLink.dataset.view || viewLink.dataset.jump;
    history.pushState(null, '', `#${view}`);
    setView(view);
    return;
  }

  if (!canEditTrip() && event.target.closest(editControlSelector)) {
    event.preventDefault();
    showToast('公开页面为只读展示，请使用完整协作链接编辑');
    return;
  }

  const checkToggle = event.target.closest('[data-check-toggle]');
  if (checkToggle) {
    const item = state.checklist.find(entry => entry.id === checkToggle.dataset.checkToggle);
    if (item) { item.done = checkToggle.checked; saveState(); }
    return;
  }

  const editDay = event.target.closest('[data-edit-day]');
  if (editDay) { openDayForm(state.itinerary.find(item => item.id === editDay.dataset.editDay)); return; }
  const deleteDay = event.target.closest('[data-delete-day]');
  if (deleteDay && confirm('删除这一天的行程吗？')) {
    state.itinerary = state.itinerary.filter(item => item.id !== deleteDay.dataset.deleteDay);
    saveState('已删除'); return;
  }
  const viewPhoto = event.target.closest('[data-view-photo]');
  if (viewPhoto) {
    const photo = photoRecords.find(item => item.id === viewPhoto.dataset.viewPhoto);
    if (photo) {
      $('#photoDialogImage').src = photoUrl(photo);
      $('#photoDialogImage').alt = photo.name;
      $('#photoDialogCaption').textContent = photo.name;
      $('#photoDialog').showModal();
    }
    return;
  }
  const photoDelete = event.target.closest('[data-delete-photo]');
  if (photoDelete && confirm('删除这张旅途照片吗？')) {
    deletePhoto(photoDelete.dataset.deletePhoto).catch(() => showToast('照片删除失败'));
    return;
  }
  const viewMapStop = event.target.closest('[data-view-map-stop]');
  if (viewMapStop) {
    const stop = getMapStops().find(item => item.id === viewMapStop.dataset.viewMapStop);
    if (stop) {
      selectedMapStopId = stop.id;
      renderRouteMap();
      routeMapInstance?.panTo([stop.lat, stop.lon], { animate: true });
      $('.route-map-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return;
  }
  const viewItineraryDay = event.target.closest('[data-view-itinerary-day]');
  if (viewItineraryDay) {
    document.getElementById(`day-${viewItineraryDay.dataset.viewItineraryDay}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const mapStop = event.target.closest('[data-map-stop]');
  if (mapStop) {
    selectedMapStopId = mapStop.dataset.mapStop;
    renderRouteMap();
    return;
  }
  const toggleCheckin = event.target.closest('[data-toggle-checkin]');
  if (toggleCheckin) {
    state.checkins ||= {};
    const stopId = toggleCheckin.dataset.toggleCheckin;
    if (state.checkins[stopId]) delete state.checkins[stopId];
    else state.checkins[stopId] = new Date().toISOString();
    saveState(state.checkins[stopId] ? '打卡成功' : '已取消打卡');
    return;
  }
  const addMapStop = event.target.closest('[data-add-map-stop]');
  if (addMapStop) { openMapStopForm(); return; }
  const editMapStop = event.target.closest('[data-edit-map-stop]');
  if (editMapStop) {
    openMapStopForm(getMapStops().find(item => item.id === editMapStop.dataset.editMapStop));
    return;
  }
  const deleteMapStop = event.target.closest('[data-delete-map-stop]');
  if (deleteMapStop) {
    const stop = getMapStops().find(item => item.id === deleteMapStop.dataset.deleteMapStop);
    if (stop && confirm(`从地图路线中删除“${stop.name}”吗？当天行程和已经上传的照片仍会保留。`)) {
      state.mapStops = getMapStops().filter(item => item.id !== stop.id);
      if (state.checkins) delete state.checkins[stop.id];
      selectedMapStopId = state.mapStops[0]?.id || '';
      saveState('地图地点已删除');
      requestAnimationFrame(focusRouteMap);
    }
    return;
  }
  const addBooking = event.target.closest('[data-add-booking-day]');
  if (addBooking) { openBookingForm(null, addBooking.dataset.addBookingDay); return; }
  const addChecklistItem = event.target.closest('[data-add-checklist-item]');
  if (addChecklistItem) { openChecklistItemForm(addChecklistItem.dataset.addChecklistItem); return; }
  const editChecklistList = event.target.closest('[data-edit-checklist-list]');
  if (editChecklistList) {
    openChecklistListForm(state.checklistLists.find(item => item.id === editChecklistList.dataset.editChecklistList));
    return;
  }
  const deleteChecklistList = event.target.closest('[data-delete-checklist-list]');
  if (deleteChecklistList) {
    const list = state.checklistLists.find(item => item.id === deleteChecklistList.dataset.deleteChecklistList);
    if (list && confirm(`删除“${list.name}”及其中全部物品吗？`)) {
      state.checklistLists = state.checklistLists.filter(item => item.id !== list.id);
      state.checklist = state.checklist.filter(item => item.listId !== list.id);
      saveState('清单已删除');
    }
    return;
  }
  const deleteCheck = event.target.closest('[data-delete-check]');
  if (deleteCheck) {
    state.checklist = state.checklist.filter(item => item.id !== deleteCheck.dataset.deleteCheck);
    saveState('已从清单移除'); return;
  }
  const deleteExpense = event.target.closest('[data-delete-expense]');
  if (deleteExpense && confirm('删除这笔花费吗？')) {
    state.expenses = state.expenses.filter(item => item.id !== deleteExpense.dataset.deleteExpense);
    saveState('花费已删除'); return;
  }
  const editBooking = event.target.closest('[data-edit-booking]');
  if (editBooking) { openBookingForm(state.bookings.find(item => item.id === editBooking.dataset.editBooking)); return; }
  const deleteBooking = event.target.closest('[data-delete-booking]');
  if (deleteBooking && confirm('删除这项预订吗？')) {
    state.bookings = state.bookings.filter(item => item.id !== deleteBooking.dataset.deleteBooking);
    saveState('预订已删除');
  }
});

document.addEventListener('change', event => {
  const input = event.target.closest('[data-photo-input]');
  if (!input || !input.files?.length) return;
  if (!canEditTrip()) {
    input.value = '';
    showToast('公开页面为只读展示');
    return;
  }
  addPhotos(input.dataset.photoInput, input.files, input.dataset.photoStop || '')
    .catch(error => { console.warn(error); showToast('照片保存失败，请重试'); })
    .finally(() => { input.value = ''; });
});

$('#cloudButton').addEventListener('click', openShareDialog);
$('#shareDialogClose').addEventListener('click', () => $('#shareDialog').close());
$('#shareDialog').addEventListener('click', event => {
  if (event.target === $('#shareDialog')) $('#shareDialog').close();
});
$('#createShareButton').addEventListener('click', createSharedTrip);
$('#syncNowButton').addEventListener('click', () => cloudDirty ? pushCloudState({ notify: true }) : pullCloudState({ notify: true }));
$('#copyShareButton').addEventListener('click', async () => {
  const link = buildShareUrl();
  try {
    await navigator.clipboard.writeText(link);
  } catch {
    const input = $('#shareLinkInput');
    input.focus();
    input.select();
    document.execCommand('copy');
  }
  showToast('共享链接已复制');
});

$('#settingsButton').addEventListener('click', openSettings);
$('#refreshWeatherButton').addEventListener('click', () => refreshWeather(true));
$('#addDayButton').addEventListener('click', () => openDayForm());
$('#addChecklistButton').addEventListener('click', () => openChecklistListForm());
$('#addExpenseButton').addEventListener('click', openExpenseForm);
$('#editContactsButton').addEventListener('click', openContactForm);
$('#photoDialogClose').addEventListener('click', () => $('#photoDialog').close());
$('#photoDialog').addEventListener('click', event => {
  if (event.target === $('#photoDialog')) $('#photoDialog').close();
});
$('#clearExpensesButton').addEventListener('click', () => {
  if (!canEditTrip()) return showToast('公开页面为只读展示');
  if (!state.expenses.length) return showToast('目前没有花费记录');
  if (confirm('确定清空全部花费记录吗？此操作无法撤销。')) {
    state.expenses = [];
    saveState('花费记录已清空');
  }
});

$('#exportButton').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `青海旅行备份-${isoDate(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast('备份已导出');
});

$('#importButton').addEventListener('click', () => $('#importFile').click());
$('#importFile').addEventListener('change', async event => {
  if (!canEditTrip()) {
    event.target.value = '';
    showToast('公开页面为只读展示');
    return;
  }
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!imported.meta || !Array.isArray(imported.itinerary) || !Array.isArray(imported.checklist)) throw new Error();
    if (!confirm('导入会覆盖当前数据，确定继续吗？')) return;
    state = normalizeCloudState(imported);
    saveState('数据已导入');
  } catch {
    alert('无法读取这个备份文件。');
  } finally {
    event.target.value = '';
  }
});

window.addEventListener('hashchange', () => setView(location.hash.slice(1)));
window.addEventListener('popstate', () => setView(location.hash.slice(1)));
window.addEventListener('online', () => pullCloudState({ notify: true }));
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') pullCloudState();
});
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations
        .filter(registration => registration.scope.includes('/travel/'))
        .map(registration => registration.unregister()));
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.filter(key => key.startsWith('qinghai-trip-')).map(key => caches.delete(key)));
      }
    } catch { /* 清理旧版离线安装失败时不影响网页使用 */ }
  });
}

renderAll();
setView(location.hash.slice(1) || 'home');
refreshPhotoRecords();
refreshWeather();
initializeCloudSync();

/*
 * Общие элементы контентных страниц (ночная тема): шапка с меню, переключатель языков,
 * подвал с пейзажем, плитка мифов, фильтры справочника видов.
 * Каждая страница сообщает о себе через атрибуты <html>:
 *   lang      — язык страницы (ru, en, uz)
 *   data-root — путь до корня сайта ("", "../", "../../")
 *   data-path — путь страницы внутри языковой папки ("help.html", "encyclopedia/caves.html")
 * Переводы одной страницы лежат по одинаковому пути в папке своего языка.
 */
(function () {
  // Языки: папка '' — язык по умолчанию (корень сайта); start — стартовая страница языка
  var LANGS = [
    { code: 'ru', dir: '',    name: 'Русский',   start: 'index.html' },
    { code: 'en', dir: 'en/', name: 'English',   start: 'index.html' },
    { code: 'uz', dir: 'uz/', name: 'Oʻzbekcha', start: 'index.html' }
  ];

  // Пункты главного меню
  var NAV = ['help.html', 'myths.html', 'encyclopedia.html', 'materials.html'];

  // Соцсети
  var SOCIAL = [
    { id: 'telegram',  name: 'Telegram',  url: 'https://t.me/bats_uz' },
    { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/bats.uz' },
    { id: 'facebook',  name: 'Facebook',  url: 'https://www.facebook.com/people/Bats-of-Central-Asia-%D0%9B%D0%B5%D1%82%D1%83%D1%87%D0%B8%D0%B5-%D0%BC%D1%8B%D1%88%D0%B8-%D0%A6%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%90%D0%B7%D0%B8%D0%B8/61589223601874/' }
  ];

  // Одноцветные иконки — берут цвет текста
  var ICONS = {
    telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.4 4.1 2.9 11.3c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.5c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.8c.3-1.3-.5-1.9-1.5-1.3ZM9 14.6l-.3 3.6-1.5-4.6 10.6-6.7c.5-.3.9-.1.5.2L9 14.6Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.6 21.5v-8.6h2.9l.4-3.4h-3.3V7.4c0-1 .3-1.6 1.7-1.6h1.8v-3a24 24 0 0 0-2.6-.1c-2.6 0-4.3 1.6-4.3 4.4v2.4H7.3v3.4h2.9v8.6h3.4Z"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="13.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.2 14.8 4 20" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
  };

  var T = {
    ru: {
      nav: { 'encyclopedia.html': 'Летучие мыши Центральной Азии', 'help.html': 'Помощь летучим мышам', 'myths.html': 'Они опасные?', 'materials.html': 'Материалы' },
      title: 'Летучие мыши Центральной Азии', tagline: 'Центр помощи летучим мышам',
      contact: 'Связаться с нами', search: 'Поиск по сайту',
      skip: 'Перейти к содержимому', menu: 'Меню', mainNav: 'Главное меню', langs: 'Выбор языка', social: 'Соцсети',
      speciesCount: function (n, total) {
        var f = n % 10 === 1 && n % 100 !== 11 ? 'вид' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'вида' : 'видов';
        return n + ' ' + f + ' из ' + total;
      },
      footerDraft: 'Сайт в разработке.'
    },
    en: {
      nav: { 'encyclopedia.html': 'Bats of Central Asia', 'help.html': 'Help bats', 'myths.html': 'Are they dangerous?', 'materials.html': 'Materials' },
      title: 'Bats of Central Asia', tagline: 'Bat Rescue Centre',
      contact: 'Contact us', search: 'Search the site',
      skip: 'Skip to content', menu: 'Menu', mainNav: 'Main navigation', langs: 'Choose language', social: 'Social media',
      speciesCount: function (n, total) { return n + ' of ' + total + ' species'; },
      footerDraft: 'Site under construction.'
    },
    uz: {
      nav: { 'encyclopedia.html': 'Markaziy Osiyo koʻrshapalaklari', 'help.html': 'Koʻrshapalaklarga yordam', 'myths.html': 'Ular xavflimi?', 'materials.html': 'Materiallar' },
      title: 'Markaziy Osiyo koʻrshapalaklari', tagline: 'Koʻrshapalaklarga yordam markazi',
      contact: 'Biz bilan bogʻlanish', search: 'Saytdan qidirish',
      skip: 'Asosiy mazmunga oʻtish', menu: 'Menyu', mainNav: 'Asosiy menyu', langs: 'Tilni tanlash', social: 'Ijtimoiy tarmoqlar',
      speciesCount: function (n, total) { return total + ' ta turdan ' + n + ' tasi'; },
      footerDraft: 'Sayt ishlab chiqilmoqda.'
    }
  };

  var doc = document.documentElement;
  var lang = doc.lang;
  var root = doc.getAttribute('data-root') || '';
  var path = doc.getAttribute('data-path') || 'index.html';
  var t = T[lang] || T.ru;

  var current = LANGS[0];
  for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === lang) current = LANGS[i];
  var base = root + current.dir;

  function isActive(item) {
    return path === item || path.indexOf(item.replace('.html', '/')) === 0;
  }

  var social = '';
  for (var s = 0; s < SOCIAL.length; s++) {
    social += '<a href="' + SOCIAL[s].url + '" title="' + SOCIAL[s].name + '" target="_blank" rel="noopener">' +
      ICONS[SOCIAL[s].id] + '<span class="visually-hidden">' + SOCIAL[s].name + '</span></a>';
  }

  // Шапка
  var header = document.getElementById('site-header');
  if (header) {
    var nav = '';
    for (var n = 0; n < NAV.length; n++) {
      nav += '<li><a href="' + base + NAV[n] + '"' + (isActive(NAV[n]) ? ' aria-current="page"' : '') + '>' +
        t.nav[NAV[n]] + '</a></li>';
    }
    var langs = '';
    for (var l = 0; l < LANGS.length; l++) {
      var L = LANGS[l];
      langs += '<li><a href="' + root + L.dir + path + '" hreflang="' + L.code + '" lang="' + L.code + '"' +
        (L.code === lang ? ' aria-current="true"' : '') + '>' + L.code.toUpperCase() + ' · ' + L.name + '</a></li>';
    }

    header.insertAdjacentHTML('beforebegin', '<a class="skip-link" href="#main">' + t.skip + '</a>');
    header.innerHTML =
      '<div class="site-header__inner">' +
        '<a class="brand" href="' + base + current.start + '">' +
          '<img src="' + root + 'images/logo-full-night2.png" alt="Bats of Central Asia — ' + t.title + '" width="1080" height="1350">' +
        '</a>' +
        '<p class="tagline">' + t.tagline + '</p>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-panel">' +
          '<span class="nav-toggle__bar" aria-hidden="true"></span><span class="visually-hidden">' + t.menu + '</span>' +
        '</button>' +
        '<div class="site-panel" id="site-panel">' +
          '<nav class="site-nav" aria-label="' + t.mainNav + '"><ul>' + nav + '</ul></nav>' +
          '<div class="tools">' +
            '<div class="tools__row">' +
              '<nav class="social" aria-label="' + t.social + '">' + social + '</nav>' +
              '<form class="search" role="search">' +
                '<span class="search__icon">' + ICONS.search + '</span>' +
                '<input class="search__input" type="search" name="q" aria-label="' + t.search + '" placeholder="' + t.search + '">' +
              '</form>' +
              '<details class="lang">' +
                '<summary class="lang__current" aria-label="' + t.langs + '">' + lang.toUpperCase() + '</summary>' +
                '<ul class="lang__list">' + langs + '</ul>' +
              '</details>' +
            '</div>' +
            '<a class="contact-btn" href="' + base + 'help.html#contacts">' + t.contact + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Мобильное меню
    var btn = header.querySelector('.nav-toggle');
    var panel = header.querySelector('.site-panel');
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Поиск: пока своего поиска нет — ищем по сайту через Google (заработает после публикации на домене)
    header.querySelector('.search').addEventListener('submit', function (e) {
      e.preventDefault();
      var q = this.q.value.trim();
      if (!q) return;
      var site = location.hostname ? 'site:' + location.hostname + ' ' : '';
      window.open('https://www.google.com/search?q=' + encodeURIComponent(site + q), '_blank', 'noopener');
    });

    // Закрывать список языков при клике вне его
    var langBox = header.querySelector('.lang');
    document.addEventListener('click', function (e) {
      if (langBox.open && !langBox.contains(e.target)) langBox.open = false;
    });
  }

  // Подвал с пейзажем
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'landscape';
    footer.innerHTML =
      '<img class="landscape__art" src="' + root + 'images/landscape.jpg" alt="" width="1086" height="560" loading="lazy" decoding="async">' +
      '<div class="landscape__bar">' +
        '<p class="landscape__meta">© ' + new Date().getFullYear() + ' Bats of Central Asia · ' + t.footerDraft + '</p>' +
        '<nav class="social landscape__links" aria-label="' + t.social + '">' + social + '</nav>' +
      '</div>';
  }

  // Мифы: на широком экране — плитка, ответ показывается в панели справа;
  // на узком — обычные раскрывающиеся <details>
  var myths = document.querySelector('.myths');
  if (myths) {
    var mythPanel = myths.querySelector('.myths__panel');
    var mythItems = myths.querySelectorAll('.myth-item');
    var wide = window.matchMedia('(min-width: 900px)');
    var showMyth = function (item) {
      for (var k = 0; k < mythItems.length; k++) mythItems[k].classList.toggle('is-active', mythItems[k] === item);
      mythPanel.innerHTML = item.querySelector('.myth__answer').innerHTML;
    };
    var onShow = function (e) {
      if (!wide.matches) return;
      if (e.type === 'click') e.preventDefault();
      showMyth(this.parentNode);
    };
    for (var m = 0; m < mythItems.length; m++) {
      var summary = mythItems[m].querySelector('summary');
      // Клик, наведение мышью и фокус с клавиатуры
      summary.addEventListener('click', onShow);
      summary.addEventListener('mouseenter', onShow);
      summary.addEventListener('focus', onShow);
    }
    if (mythItems.length) showMyth(mythItems[0]);
  }

  // Справочник видов: фильтры по стране, охранному статусу, риску ветряков и поиск по названию.
  // Карточки — обычные ссылки в HTML (их видят поисковики), фильтр только скрывает лишние.
  var explorer = document.querySelector('.species-explorer');
  if (explorer) {
    var cards = explorer.querySelectorAll('.species-card');
    var countEl = explorer.querySelector('.species-count');
    var emptyEl = explorer.querySelector('.species-empty');
    var filter = { country: '', status: '', wind: '', q: '' };
    var norm = function (s) { return s.toLowerCase().replace(/ё/g, 'е').replace(/[ʻʼ'`‘’]/g, ''); };
    var words = function (s) { return s ? s.split(' ') : []; };
    var applyFilter = function () {
      var shown = 0;
      for (var i = 0; i < cards.length; i++) {
        var c = cards[i];
        var red = words(c.getAttribute('data-redbook'));
        var inRed = filter.country ? red.indexOf(filter.country) >= 0 : red.length > 0;
        var ok = (!filter.country || words(c.getAttribute('data-countries')).indexOf(filter.country) >= 0) &&
          (!filter.status || (filter.status === 'in') === inRed) &&
          (!filter.wind || c.getAttribute('data-wind') === filter.wind) &&
          (!filter.q || norm(c.getAttribute('data-search')).indexOf(filter.q) >= 0);
        c.hidden = !ok;
        if (ok) shown++;
      }
      countEl.textContent = t.speciesCount(shown, cards.length);
      emptyEl.hidden = shown > 0;
    };
    var chips = explorer.querySelectorAll('.chip');
    for (var ch = 0; ch < chips.length; ch++) {
      chips[ch].addEventListener('click', function () {
        var group = this.getAttribute('data-group');
        filter[group] = this.getAttribute('data-value');
        var same = explorer.querySelectorAll('.chip[data-group="' + group + '"]');
        for (var j = 0; j < same.length; j++) same[j].setAttribute('aria-pressed', same[j] === this ? 'true' : 'false');
        applyFilter();
      });
    }
    explorer.querySelector('.species-search').addEventListener('input', function () {
      filter.q = norm(this.value.trim());
      applyFilter();
    });
    applyFilter();
  }
})();

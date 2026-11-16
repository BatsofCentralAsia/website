// Стартовая страница: поиск и переключатель языков в верхней строке.
(function () {
  // Поиск: пока своего поиска нет — ищем по сайту через Google (заработает после публикации на домене)
  var search = document.querySelector('.topline .search');
  if (search) search.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = this.q.value.trim();
    if (!q) return;
    var site = location.hostname ? 'site:' + location.hostname + ' ' : '';
    window.open('https://www.google.com/search?q=' + encodeURIComponent(site + q), '_blank', 'noopener');
  });

  // Закрывать список языков при клике вне его
  var langBox = document.querySelector('.topline .lang');
  if (langBox) document.addEventListener('click', function (e) {
    if (langBox.open && !langBox.contains(e.target)) langBox.open = false;
  });
})();

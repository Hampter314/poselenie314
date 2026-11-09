// === Версия для слабовидящих (с сохранением между страницами) ===
const accessBtn = document.getElementById('accessibility-btn');
const body = document.body;

// Функция применения темы
function applyAccessibility(enabled) {
  if (enabled) {
    body.classList.add('accessibility');
    if (accessBtn) accessBtn.textContent = 'Обычная версия';
  } else {
    body.classList.remove('accessibility');
    if (accessBtn) accessBtn.textContent = 'Версия для слабовидящих';
  }
}

// При загрузке страницы — читаем сохранённое значение
const savedAccess = localStorage.getItem('accessibility') === 'on';
applyAccessibility(savedAccess);

// Обработчик кнопки
if (accessBtn) {
  accessBtn.addEventListener('click', () => {
    const nowEnabled = !body.classList.contains('accessibility');
    applyAccessibility(nowEnabled);
    localStorage.setItem('accessibility', nowEnabled ? 'on' : 'off');
  });
}

// === Фильтр новостей по году (только на news.html) ===
const newsYear = document.getElementById('news-year');
if (newsYear) {
  const newsItems = document.querySelectorAll('.news-item');
  const noNews = document.getElementById('no-news');

  newsYear.addEventListener('change', () => {
    const year = newsYear.value;
    let visible = 0;

    newsItems.forEach(item => {
      const match = (year === 'all' || item.dataset.year === year);
      item.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    if (noNews) noNews.hidden = visible > 0;
  });
}

// === Поиск и фильтр документов (только на docs.html) ===
const docSearch = document.getElementById('doc-search');
const docType = document.getElementById('doc-type');
if (docSearch && docType) {
  const rows = document.querySelectorAll('#docs-table tbody tr');
  const noDocs = document.getElementById('no-docs');

  function filterDocs() {
    const query = docSearch.value.toLowerCase().trim();
    const type = docType.value;
    let visible = 0;

    rows.forEach(row => {
      const text = row.cells[0].textContent.toLowerCase();
      const rowType = row.dataset.type;
      const matchQuery = !query || text.includes(query);
      const matchType = (type === 'all' || rowType === type);
      const show = matchQuery && matchType;
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (noDocs) noDocs.hidden = visible > 0;
  }

  docSearch.addEventListener('input', filterDocs);
  docType.addEventListener('change', filterDocs);
}
// === Появление карточек структуры при прокрутке (admin.html) ===
const structureItems = document.querySelectorAll('.structure-item');
if (structureItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  structureItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(15px)';
    item.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
    observer.observe(item);
  });
}

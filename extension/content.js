(function () {
  'use strict';

  const STORAGE_KEYS = {
    EXCLUDED_COURSES: 'weblab_excluded_courses_v3',
    COLLAPSED_RECENT: 'weblab_collapsed_recent_v3'
  };

  let isUpdating = false;
  let showHiddenPanel = false;
  let cachedRecentCourses = [];

  function loadExcludedCourses() {
    const raw = localStorage.getItem(STORAGE_KEYS.EXCLUDED_COURSES);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function saveExcludedCourses(list) {
    localStorage.setItem(STORAGE_KEYS.EXCLUDED_COURSES, JSON.stringify(list));
  }

  function findRecentHeading() {
    const tagged = document.querySelector('[data-weblab-recent-heading="true"]');
    if (tagged) return tagged;

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, div, span, p');
    for (const h of headings) {
      if (h.closest('#weblab-current-courses-section')) continue;

      let text = '';
      for (const node of h.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          text += node.textContent;
        }
      }
      text = text.trim().toLowerCase();

      if (text === 'recent courses' || text.startsWith('recent courses')) {
        h.setAttribute('data-weblab-recent-heading', 'true');
        return h;
      }
    }
    return null;
  }

  function findRecentContainer() {
    const tagged = document.querySelector('[data-weblab-recent-container="true"]');
    if (tagged) return tagged;

    const heading = findRecentHeading();
    if (!heading) return null;

    let cur = heading.nextElementSibling;
    while (cur) {
      if (cur.id === 'weblab-current-courses-section') {
        cur = cur.nextElementSibling;
        continue;
      }
      if (cur.tagName === 'HR' || (cur.textContent || '').toLowerCase().includes('course catalog')) {
        break;
      }
      if (cur.querySelectorAll('a').length > 0) {
        cur.setAttribute('data-weblab-recent-container', 'true');
        return cur;
      }
      cur = cur.nextElementSibling;
    }

    const parent = heading.parentElement;
    if (parent) {
      let sib = parent.nextElementSibling;
      while (sib) {
        if (sib.id === 'weblab-current-courses-section') {
          sib = sib.nextElementSibling;
          continue;
        }
        if (sib.querySelectorAll('a').length > 0) {
          sib.setAttribute('data-weblab-recent-container', 'true');
          return sib;
        }
        sib = sib.nextElementSibling;
      }
    }

    return null;
  }

  function getRecentCourses() {
    if (cachedRecentCourses.length > 0) {
      return cachedRecentCourses;
    }

    const container = findRecentContainer();
    if (!container) return [];

    const rawLinks = Array.from(container.querySelectorAll('a'));
    const cards = [];
    const seenElements = new Set();
    const seenCodes = new Set();

    for (const a of rawLinks) {
      const text = (a.innerText || a.textContent || '').trim();
      if (!text || text.length < 3) continue;

      const cardEl = a.closest('.thumbnail, [class*="card"], [class*="course"], [class*="col-"]') || a;
      if (seenElements.has(cardEl)) continue;
      seenElements.add(cardEl);

      const codeMatch = text.match(/\b([A-Z]{2,4}\s*\d{2,4}[A-Za-z]?)\b/);
      const code = codeMatch ? codeMatch[1].replace(/\s+/g, '') : (a.pathname || a.href);

      if (seenCodes.has(code)) continue;
      seenCodes.add(code);

      const lines = text.split('\n').map(s => s.trim()).filter(Boolean);
      let title = code;
      for (const line of lines) {
        if (line !== code && !line.includes('202') && line !== 'TU Delft' && line.length > 2) {
          title = line;
          break;
        }
      }

      cards.push({
        id: code,
        code,
        title,
        element: cardEl,
        originalAnchor: a,
        href: a.href
      });
    }

    if (cards.length > 0) {
      cachedRecentCourses = cards;
    }

    return cards;
  }

  function hideCourse(id) {
    if (!id) return;
    const excluded = loadExcludedCourses();
    if (!excluded.includes(id)) {
      excluded.push(id);
      saveExcludedCourses(excluded);
    }
    isUpdating = false;
    renderSection();
  }

  function restoreCourse(id) {
    if (!id) return;
    let excluded = loadExcludedCourses();
    excluded = excluded.filter(x => x !== id);
    saveExcludedCourses(excluded);
    isUpdating = false;
    renderSection();
  }

  function resetAll() {
    saveExcludedCourses([]);
    isUpdating = false;
    renderSection();
  }

  function toggleCollapseRecent(shouldCollapse) {
    localStorage.setItem(STORAGE_KEYS.COLLAPSED_RECENT, shouldCollapse ? 'true' : 'false');
    applyRecentCollapseState();
    isUpdating = false;
    renderSection();
  }

  function applyRecentCollapseState() {
    const isCollapsed = localStorage.getItem(STORAGE_KEYS.COLLAPSED_RECENT) === 'true';
    const container = findRecentContainer();
    const heading = findRecentHeading();
    if (!container || !heading) return;

    if (isCollapsed) {
      container.classList.add('weblab-collapsed-content');
    } else {
      container.classList.remove('weblab-collapsed-content');
    }

    let badge = heading.querySelector('.weblab-collapse-header-btn');
    if (!badge) {
      badge = document.createElement('button');
      badge.className = 'weblab-collapse-header-btn';
      badge.type = 'button';
      heading.appendChild(badge);
    }
    badge.textContent = isCollapsed ? '▶ Expand Below' : '▼ Collapse Below';
    badge.onclick = (e) => {
      e.stopPropagation();
      toggleCollapseRecent(!isCollapsed);
    };
  }

  function renderSection() {
    if (isUpdating) return;
    isUpdating = true;

    try {
      const recentHeading = findRecentHeading();
      if (!recentHeading) {
        isUpdating = false;
        return;
      }

      const recentContainer = recentHeading.closest('.row') || recentHeading.parentElement;
      let section = document.getElementById('weblab-current-courses-section');
      if (!section) {
        section = document.createElement('div');
        section.id = 'weblab-current-courses-section';
        recentContainer.parentElement.insertBefore(section, recentContainer);
      }

      const allRecentCourses = getRecentCourses();
      const excluded = loadExcludedCourses();

      const activeCourses = allRecentCourses.filter(c => !excluded.includes(c.id));
      const hiddenCourses = allRecentCourses.filter(c => excluded.includes(c.id));

      section.innerHTML = '';

      const header = document.createElement('div');
      header.className = 'weblab-cc-header';

      const titleArea = document.createElement('div');
      titleArea.className = 'weblab-cc-title-area';

      const title = document.createElement('h3');
      title.className = 'weblab-cc-title';
      title.textContent = 'Courses Currently Taking';

      const countBadge = document.createElement('span');
      countBadge.className = 'weblab-cc-count';
      countBadge.textContent = `(${activeCourses.length})`;

      titleArea.appendChild(title);
      titleArea.appendChild(countBadge);

      const toolbar = document.createElement('div');
      toolbar.className = 'weblab-cc-toolbar';

      if (hiddenCourses.length > 0) {
        const toggleHiddenBtn = document.createElement('button');
        toggleHiddenBtn.type = 'button';
        toggleHiddenBtn.className = 'weblab-btn';
        toggleHiddenBtn.textContent = showHiddenPanel ? '▲ Hide Drawer' : `Hidden (${hiddenCourses.length})`;
        toggleHiddenBtn.onclick = () => {
          showHiddenPanel = !showHiddenPanel;
          isUpdating = false;
          renderSection();
        };
        toolbar.appendChild(toggleHiddenBtn);
      }

      const toggleRecentBtn = document.createElement('button');
      toggleRecentBtn.type = 'button';
      toggleRecentBtn.className = 'weblab-btn';
      const isRecentCollapsed = localStorage.getItem(STORAGE_KEYS.COLLAPSED_RECENT) === 'true';
      toggleRecentBtn.textContent = isRecentCollapsed ? 'Show Recent Below' : 'Hide Recent Below';
      toggleRecentBtn.onclick = () => {
        toggleCollapseRecent(!isRecentCollapsed);
      };
      toolbar.appendChild(toggleRecentBtn);

      if (excluded.length > 0) {
        const resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.className = 'weblab-btn';
        resetBtn.textContent = 'Reset All';
        resetBtn.title = 'Restore all courses in real time';
        resetBtn.onclick = () => {
          resetAll();
        };
        toolbar.appendChild(resetBtn);
      }

      header.appendChild(titleArea);
      header.appendChild(toolbar);
      section.appendChild(header);

      if (showHiddenPanel && hiddenCourses.length > 0) {
        const drawer = document.createElement('div');
        drawer.className = 'weblab-hidden-drawer';
        drawer.innerHTML = `<span>Deselected:</span>`;

        for (const c of hiddenCourses) {
          const pill = document.createElement('button');
          pill.type = 'button';
          pill.className = 'weblab-restore-pill';
          pill.innerHTML = `+ ${c.code}`;
          pill.title = `Restore ${c.code}`;
          pill.onclick = () => {
            restoreCourse(c.id);
          };
          drawer.appendChild(pill);
        }
        section.appendChild(drawer);
      }

      const grid = document.createElement('div');
      grid.className = 'weblab-cc-grid';

      if (activeCourses.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'weblab-cc-empty';
        empty.textContent = 'All courses are currently hidden. Click "Hidden" above or "Reset All" to restore.';
        grid.appendChild(empty);
      } else {
        for (const item of activeCourses) {
          const wrapper = document.createElement('div');
          wrapper.className = 'weblab-card-wrapper';

          const content = document.createElement('div');
          content.className = 'weblab-card-content';

          const cardNode = item.element.cloneNode(true);
          const oldBtn = cardNode.querySelector('.weblab-hide-btn, .weblab-star-btn');
          if (oldBtn) oldBtn.remove();
          cardNode.style.display = 'block';
          cardNode.style.margin = '0';
          content.appendChild(cardNode);

          content.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (item.originalAnchor) {
              item.originalAnchor.click();
            } else if (item.element) {
              item.element.click();
            } else if (item.href) {
              window.location.href = item.href;
            }
          };

          const closeBtn = document.createElement('button');
          closeBtn.type = 'button';
          closeBtn.className = 'weblab-hide-btn';
          closeBtn.innerHTML = '✕';
          closeBtn.title = `Hide ${item.code} from Currently Taking`;

          closeBtn.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            hideCourse(item.id);
          };

          wrapper.appendChild(content);
          wrapper.appendChild(closeBtn);
          grid.appendChild(wrapper);
        }
      }

      section.appendChild(grid);

      const hr = document.createElement('hr');
      hr.className = 'weblab-section-hr';
      section.appendChild(hr);

      applyRecentCollapseState();

    } catch (err) {
      console.error('[WebLab Enhancer] Error:', err);
    } finally {
      isUpdating = false;
    }
  }

  function init() {
    renderSection();

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 100);

    let debounceTimer = null;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (!document.getElementById('weblab-current-courses-section')) {
          cachedRecentCourses = [];
          renderSection();
        }
      }, 300);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

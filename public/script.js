// script.js

window.addEventListener('DOMContentLoaded', () => {
    const inputUrl     = document.getElementById('video-url');
    const platformIcon = document.getElementById('platform-icon');
    const btn          = document.getElementById('download-btn');
    const msg          = document.getElementById('message');
    const historyList  = document.getElementById('download-history');
    const titleEl      = document.getElementById('video-title');
  
    // ⚙️ Ajuste o nome se o seu SVG for "links.svg"
    const ICON_URLS = {
      default:   'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDEzQTUgNSAwIDAgMCA3LjU0IDcuNTRMMTAuODggNC4xOUE1IDUgMCAwIDEgMTguMzIgMTEuNjhMMTUgMTVBNSA1IDAgMCAxIDcuNTQgNy41NEw5IDlBMyAzIDAgMCAwIDEzLjY4IDEzLjY4TDE1IDE1IiBzdHJva2U9IiM0RUExRDMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=',
      youtube:   'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGMDAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIzLjQ5OCA2LjE4NmEzLjAxNiAzLjAxNiAwIDAgMC0yLjEyMi0yLjEzNkMxOS41MDUgMy41NDUgMTIgMy41NDUgMTIgMy41NDVzLTcuNTA1IDAtOS4zNzcuNTA1QTMuMDE3IDMuMDE3IDAgMCAwIC41MDEgNi4xODZDMCA4LjA3IDAgMTIgMCAxMnMwIDMuOTMuNTAxIDUuODE0YTMuMDE2IDMuMDE2IDAgMCAwIDIuMTIyIDIuMTM2YzEuODcxLjUwNSA5LjM3Ni41MDUgOS4zNzYuNTA1czcuNTA1IDAgOS4zNzctLjUwNWEzLjAxNSAzLjAxNSAwIDAgMCAyLjEyMi0yLjEzNkMyNCAzLjkzIDI0IDEyIDI0IDEyczAtMy45My0uNTAyLTUuODE0ek05LjU0NSAxNS41NjhWOC40MzJMMTUuODE4IDEybC02LjI3MyAzLjU2OHoiLz4KPC9zdmc+',
      instagram: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0U0NDA1RiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIuMTYzYzMuMjA0IDAgMy41ODQuMDEyIDQuODUuMDcgMy4yNTIuMTQ4IDQuNzcxIDEuNjkxIDQuOTE5IDQuOTE5LjA1OCAxLjI2NS4wNjkgMS42NDUuMDY5IDQuODQ4IDAgMy4yMDQtLjAxMiAzLjU4NC0uMDY5IDQuODQ5LS4xNDkgMy4yMjUtMS42NjQgNC43NzEtNC45MTkgNC45MTktMS4yNjYuMDU4LTEuNjQ0LjA3LTQuODUuMDctMy4yMDQgMC0zLjU4NC0uMDEyLTQuODQ5LS4wNy0zLjI2LS4xNDktNC43NzEtMS42OTktNC45MTktNC45MjQtLjA1OC0xLjI2NS0uMDctMS42NDQtLjA3LTQuODQ5IDAtMy4yMDQuMDEzLTMuNTgzLjA3LTQuODQ4QzIuNDA0IDMuODU0IDMuOTIgMi4zMTEgNy4xNTEgMi4xNjNjMS4yNjYtLjA1NyAxLjY0NS0uMDY5IDQuODQ5LS4wNjl6bTAgMi4zNGMtMy4yNTkgMC0zLjY2Ny4wMTQtNC45NDcuMDcyLTQuMzU4LjIwNi02LjM4IDIuMjMtNi41ODYgNi41ODYtLjA2IDEuMjc3LS4wNzIgMS42ODYtLjA3MiA0Ljk0NyAwIDMuMjU5LjAxMyAzLjY2Ny4wNzIgNC45NDcuMjA2IDQuMzU2IDIuMjMgNi41OCA2LjU4NiA2LjU4NiAxLjI4MS4wNTkgMS42ODguMDcyIDQuOTQ3LjA3MiAzLjI1OSAwIDMuNjY4LS4wMTMgNC45NDgtLjA3MiA0LjM1NC0uMjA2IDYuNTc4LTIuMjMgNi41ODQtNi41ODYuMDU5LTEuMjguMDcyLTEuNjg3LjA3Mi00Ljk0NyAwLTMuMjU5LS4wMTMtMy42NjctLjA3Mi00Ljk0Ny0uMDA2LTQuMzU2LTIuMjMtNi41OC02LjU4NC02LjU4NkMxNS42NjggNC41MDMgMTUuMjU5IDQuNTAzIDEyIDQuNTAzem0wIDEuNDQxYzMuMDMyIDAgNS40OTIgMi40NiA1LjQ5MiA1LjQ5MiAwIDMuMDMxLTIuNDYgNS40OTItNS40OTIgNS40OTJTNi41MDggMTUuNDY3IDYuNTA4IDEyLjQzNmMwLTMuMDMxIDIuNDYtNS40OTIgNS40OTItNS40OTJ6bTAgOS4wNzVjMS45OTggMCAzLjU4My0xLjU4NSAzLjU4My0zLjU4MyAwLTEuOTk4LTEuNTg1LTMuNTgzLTMuNTgzLTMuNTgzcy0zLjU4MyAxLjU4NS0zLjU4MyAzLjU4M2MwIDEuOTk4IDEuNTg1IDMuNTgzIDMuNTgzIDMuNTgzem01LjcwNy0xMC4yMDRjMCAuNzc2LS42MzEgMS40MDctMS40MDcgMS40MDctLjc3NiAwLTEuNDA3LS42MzEtMS40MDctMS40MDcgMC0uNzc2LjYzMS0xLjQwNyAxLjQwNy0xLjQwNy43NzYgMCAxLjQwNy42MzEgMS40MDcgMS40MDd6Ii8+Cjwvc3ZnPg==',
      tiktok:    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwMDAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUyNSAyLjMwNmMxLjM2OS4wNjIgMi4zNDEuMjM0IDMuMzQ5LjUzOSAxLjI2Mi4zODMgMi4yNjggMS4wMDkgMi45NjggMi4xNzUuNzAzIDEuMTcyLjkwNCAyLjQ2Ni45MDQgMy44NzV2MS4xNzljMCAxLjE3My0uMzU0IDIuMjY4LTEuMDYyIDMuMjA2LS43MDggMS4wMDktMS43MTQgMS42MzUtMi45NjggMi4wMTgtMS4yNTQuMzgzLTIuNjA5LjM4My0zLjg2MyAwLS43MDMtLjIxNS0xLjM2OS0uNTM5LTEuOTY4LS45NzMtLjU5OS0uNDM0LTEuMTM1LS45NzMtMS41NzEtMS41NzEtLjQzNi0uNTk5LS43NjEtMS4yNjItLjk3My0xLjk2OC0uMjEyLS43MDYtLjIxMi0xLjQ0OSAwLTIuMTU1LjIxMi0uNzA2LjUzNy0xLjM2OS45NzMtMS45NjguNDM2LS41OTkuOTczLTEuMTM1IDEuNTcxLTEuNTcxLjU5OS0uNDM2IDEuMjY1LS43NjEgMS45NjgtLjk3My43MDYtLjIxMiAxLjQ0OS0uMjEyIDIuMTU1IDB6bTAgMi4zNDFjLS43MDYgMC0xLjM2OS4yMTItMS45NjguNTM5LS41OTkuMzI3LTEuMTM1Ljc2MS0xLjU3MSAxLjI2Mi0uNDM2LjUwMS0uNzYxIDEuMDcyLS45NzMgMS42OTgtLjIxMi42MjYtLjIxMiAxLjI4OSAwIDEuOTE1LjIxMi42MjYuNTM3IDEuMTk3Ljk3MyAxLjY5OC40MzYuNTAxLjk3Mi45MzUgMS41NzEgMS4yNjIuNTk5LjMyNyAxLjI2Mi41MzkgMS45NjguNTM5czEuMzY5LS4yMTIgMS45NjgtLjUzOWMuNTk5LS4zMjcgMS4xMzUtLjc2MSAxLjU3MS0xLjI2Mi40MzYtLjUwMS43NjEtMS4wNzIuOTczLTEuNjk4LjIxMi0uNjI2LjIxMi0xLjI4OSAwLTEuOTE1LS4yMTItLjYyNi0uNTM3LTEuMTk3LS45NzMtMS42OTgtLjQzNi0uNTAxLS45NzItLjkzNS0xLjU3MS0xLjI2Mi0uNTk5LS4zMjctMS4yNjItLjUzOS0xLjk2OC0uNTM5eiIvPgo8L3N2Zz4K'
    };
  
    const R = {
      youtube:   /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/,
      instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p|tv)\/[\w-]+/,
      tiktok:    /^(https?:\/\/)?(www\.|vm\.)?tiktok\.com\/([@\w.-]+\/video\/\d+|[\w-]+)/
    };
  
    function detectPlatform(url) {
      try {
        const host = new URL(url).hostname.replace(/^www\./, '');
        if (/youtube\.com|youtu\.be/.test(host)) return 'youtube';
        if (/instagram\.com/.test(host))      return 'instagram';
        if (/tiktok\.com/.test(host))         return 'tiktok';
      } catch (e) { /* URL inválida */ }
      return 'default';
    }
  
    function isValidUrl(url, platform) {
      return platform in R ? R[platform].test(url) : false;
    }
  
    // ícone genérico no carregamento
    platformIcon.src = ICON_URLS.default;
  
    // trocas de ícone + validação inline
    inputUrl.addEventListener('input', () => {
      const url  = inputUrl.value.trim();
      const plat = detectPlatform(url);
      platformIcon.src = ICON_URLS[plat];
  
      if (!url) {
        inputUrl.classList.remove('valid','invalid');
        msg.textContent = '';
        return;
      }
      if (isValidUrl(url, plat)) {
        inputUrl.classList.add('valid');
        inputUrl.classList.remove('invalid');
        msg.textContent = '';
      } else {
        inputUrl.classList.add('invalid');
        inputUrl.classList.remove('valid');
        msg.style.color = 'var(--red)';
        msg.textContent = `URL inválida para ${plat==='default'?'plataforma desconhecida':plat}.`;
      }

       // só tenta buscar título no YouTube
       if (plat === 'youtube') {
        titleEl.textContent = 'Carregando título…';
        fetchYoutubeTitle(url).then(t => {
          titleEl.textContent = t || '';
        });
      } else {
        titleEl.textContent = '';
      }

    });
  
    // === Histórico via localStorage ===
    const HISTORY_KEY = 'vd_download_history';
  
    function renderHistory(arr) {
      historyList.innerHTML = '';
      if (!arr.length) {
        historyList.innerHTML = '<li><em>Sem histórico ainda</em></li>';
        return;
      }
      arr.forEach(url => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="hist-url">${url}</span>
          <button class="rebaixar-btn" data-url="${url}">Rebaixar</button>
        `;
        historyList.appendChild(li);
      });
      // reanexa listeners
      document.querySelectorAll('.rebaixar-btn').forEach(b => {
        b.addEventListener('click', () => {
          inputUrl.value = b.dataset.url;
          inputUrl.dispatchEvent(new Event('input'));
          downloadUrl();
        });
      });
    }
  
    function loadHistory() {
      const arr = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      renderHistory(arr);
    }
  
    function saveToHistory(url) {
      let arr = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      arr = arr.filter(u => u !== url);
      arr.unshift(url);
      if (arr.length > 5) arr = arr.slice(0,5);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
      renderHistory(arr);
    }
    // Busca título do YouTube via oEmbed
    async function fetchYoutubeTitle(url) {
        try {
          const api = 'https://www.youtube.com/oembed?format=json&url=';
          const res = await fetch(api + encodeURIComponent(url));
          if (!res.ok) throw new Error('sem título');
          const json = await res.json();
          return json.title;
        } catch {
          return '';
        }
      }


    // função unificada de download
    function downloadUrl() {
      const url  = inputUrl.value.trim();
      const plat = detectPlatform(url);
      if (!url || !isValidUrl(url, plat)) return;
  
      saveToHistory(url);
      btn.classList.add('loading');
      inputUrl.disabled = true;
      msg.style.color = '#333';
      msg.textContent  = 'Preparando download…';
  
      setTimeout(() => {
        window.open(
          `/download?url=${encodeURIComponent(url)}`,
          '_blank'
        );
        // opcional: remove loading após um curto período
        setTimeout(() => {
          btn.classList.remove('loading');
          inputUrl.disabled = false;
        }, 500);
      }, 100);
    }
  
      // limpa o título antigo
  titleEl.textContent = '';
  
    // listener principal do botão
    btn.addEventListener('click', () => {
      const url  = inputUrl.value.trim();
      const plat = detectPlatform(url);
      if (!url || !isValidUrl(url, plat)) {
        msg.style.color = 'var(--red)';
        msg.textContent = '❗ Cole uma URL válida antes de baixar.';
        return;
      }
      downloadUrl();
    });
  
    // inicia tudo
    loadHistory();
  });
  
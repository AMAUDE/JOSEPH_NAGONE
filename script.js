const icons = {
  ECOLE: L.divIcon({
    className: 'custom-icon',
    html: '<i class="fas fa-school icon-style school-icon"></i>',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  }),
  HOPITAL: L.divIcon({
    className: 'custom-icon',
    html: '<i class="fas fa-hospital icon-style health-icon"></i>',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  }),
  MARIE: L.divIcon({
    className: 'custom-icon',
    html: '<i class="fas fa-landmark icon-style admin-icon"></i>',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  }),
  MARCHE: L.divIcon({
    className: 'custom-icon',
    html: '<i class="fas fa-shopping-basket icon-style market-icon"></i>',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  }),
  COMISSARIAT: L.divIcon({
    className: 'custom-icon',
    html: '<i class="fas fa-shield-alt icon-style police-icon"></i>',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  })
};

const data = [
  { name: "EPP NONKOUAGON", type: "ECOLE", district: "ABIDJAN", lat: 5.381, lng: -4.123, localite: "SONGON" },
  { name: "Centre de santé Songon", type: "HOPITAL", district: "ABIDJAN", lat: 5.395, lng: -4.150, localite: "SONGON" },
  { name: "Mairie de Yopougon", type: "MARIE", district: "ABIDJAN", lat: 5.325, lng: -4.080, localite: "YOPOUGON" },
  { name: "Marché de Sinfra", type: "MARCHE", district: "SINFRA", lat: 6.620, lng: -5.910, localite: "SINFRA" },
  { name: "Commissariat de Bouaflé", type: "COMISSARIAT", district: "BOUAFLE", lat: 6.990, lng: -5.750, localite: "BOUAFLE" }
];

const map = L.map('map').setView([7.5, -5.5], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
const markerGroup = L.layerGroup().addTo(map);

function updateMap() {
  document.getElementById('loading-overlay').classList.add('active');
  setTimeout(() => {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const district = document.getElementById('districtFilter').value;
    const type = document.getElementById('regionFilter').value;
    const sortBy = document.getElementById('sort-results').value;
    
    const filtered = data.filter(d => {
      return (!district || d.district === district) &&
             (!type || d.type === type) &&
             (!keyword || d.name.toLowerCase().includes(keyword));
    });

    filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

    markerGroup.clearLayers();
    const list = document.getElementById('resultsList');
    list.innerHTML = '';
    document.getElementById('result-count').textContent = filtered.length;

    filtered.forEach(item => {
      const marker = L.marker([item.lat, item.lng], { icon: icons[item.type] }).addTo(markerGroup);
      marker.bindPopup(`<strong>${item.name}</strong><br>${item.localite} (${item.district})`);

      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.localite}`;
      li.addEventListener('click', () => {
        map.setView([item.lat, item.lng], 14);
        marker.openPopup();
      });
      list.appendChild(li);
    });

    if (filtered.length === 1) {
      map.setView([filtered[0].lat, filtered[0].lng], 13);
    } else if (filtered.length > 1) {
      const bounds = L.latLngBounds(filtered.map(d => [d.lat, d.lng]));
      map.fitBounds(bounds);
    }

    document.getElementById('loading-overlay').classList.remove('active');
  }, 500);
}

document.getElementById('searchInput').addEventListener('input', updateMap);
document.getElementById('districtFilter').addEventListener('change', updateMap);
document.getElementById('regionFilter').addEventListener('change', updateMap);
document.getElementById('sort-results').addEventListener('change', updateMap);
document.getElementById('reset-filters').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('districtFilter').value = '';
  document.getElementById('regionFilter').value = '';
  updateMap();
});
document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());
document.getElementById('locate-me').addEventListener('click', () => map.locate({ setView: true, maxZoom: 14 }));
document.getElementById('export-btn').addEventListener('click', () => alert('Export à implémenter'));
document.getElementById('theme-switch').addEventListener('change', e => {
  document.body.classList.toggle('dark-theme', e.target.checked);
});

updateMap();



// media

// Animation au défilement
    document.addEventListener('DOMContentLoaded', function() {
      const animateOnScroll = function() {
        const elements = document.querySelectorAll('.heritage-item, .profile-card');
        
        elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      };
      
      // Initial state for animation
      const items = document.querySelectorAll('.heritage-item, .profile-card');
      items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
      });
      
      // Run once on load
      animateOnScroll();
      
      // Run on scroll
      window.addEventListener('scroll', animateOnScroll);
    });

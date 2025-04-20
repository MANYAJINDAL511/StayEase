fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityLocation}`)
  .then(response => response.json())
  .then(data => {
    if (data && data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;

      const map = L.map('map').setView([lat, lon], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      }).addTo(map);

      L.marker([lat, lon]).addTo(map)
        .bindPopup("Exact location provided after booking")
        .openPopup();
    } else {
      alert("Could not locate the city on the map.");
    }
  })
  .catch(err => {
    console.error("Map error:", err);
  });

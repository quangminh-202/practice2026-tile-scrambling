const OFFSET_X = 1000;
const OFFSET_Y = 2000;

// Tạo bản đồ
const map = L.map("map").setView([60.1699, 24.9384], 12);
// Ví dụ đang mở Helsinki

// Tạo tile layer tùy chỉnh
const ScrambledTileLayer = L.TileLayer.extend({
  getTileUrl: function (coords) {
    const z = coords.z;
    const realX = coords.x;
    const realY = coords.y;

    // Client scramble tọa độ
    const fakeX = realX + OFFSET_X;
    const fakeY = realY + OFFSET_Y;

    console.log("Client real:", { z, realX, realY });
    console.log("Client fake:", { z, fakeX, fakeY });

    // Client chỉ gửi tọa độ giả lên server
    return `/tiles/${z}/${fakeX}/${fakeY}.png`;
  }
});

// Thêm layer vào map
const scrambledLayer = new ScrambledTileLayer("", {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19
});

scrambledLayer.addTo(map);
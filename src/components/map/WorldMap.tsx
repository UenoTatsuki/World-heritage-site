/**
 * WorldMap.tsx
 * React Leafletを使ったインタラクティブ世界地図コンポーネント
 * 世界遺産の位置にピンを表示し、クリックで詳細を開く
 */

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import type { HeritageItem } from '../../types/heritage'

const pinIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

interface Props {
  sites: HeritageItem[]
  onSelectSite: (site: HeritageItem) => void
}

const WorldMap = ({ sites, onSelectSite }: Props) => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="w-full h-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site.latitude, site.longitude]}
          icon={pinIcon}
          eventHandlers={{ click: () => onSelectSite(site) }}
        >
          <Popup>
            <p className="font-bold text-sm">{site.name}</p>
            <p className="text-xs text-gray-500">{site.country}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default WorldMap
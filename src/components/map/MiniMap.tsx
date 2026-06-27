/**
 * MiniMap.tsx
 * 詳細ページ用の小さな地図。1つの遺産の場所だけを表示する
 * React Leafletを使い、その地点にズームしてピンを立てる
 */
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Icon } from 'leaflet'

const pinIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface Props {
  lat: number
  lng: number
  name: string
}

const MiniMap = ({ lat, lng, name }: Props) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={6}
      className="w-full h-64 rounded-xl"
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[lat, lng]} icon={pinIcon} title={name} />
    </MapContainer>
  )
}

export default MiniMap
import type { GeoPoint } from '@/types'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'

const BRAZIL_CENTER: [number, number] = [-3.7319, -38.5267]
const INITIAL_ZOOM = 6

const MapUpdater = ({ position }: { position: GeoPoint | null }) => {
    const map = useMap()
    useEffect(() => {
        if (position)
            map.setView([position.latitude, position.longitude], map.getZoom(), { animate: true })
    }, [position, map])
    return null
}

type MapPickerProps = {
    coordinate: GeoPoint | null
    onChange?: (lat: number, lng: number) => void
    editable?: boolean
    zoom?: number
    size?: string | number
}
export const LocationPicker = ({
    coordinate,
    editable = false,
    zoom = INITIAL_ZOOM,
    size = 500,
    onChange,
}: MapPickerProps) => {
    const [position, setPosition] = useState<GeoPoint | null>(coordinate ?? null)

    useEffect(() => {
        setPosition(coordinate)
    }, [coordinate])

    const ClickHandler = () => {
        useMapEvents({
            click(e) {
                if (!editable) return
                setPosition({ latitude: e.latlng.lat, longitude: e.latlng.lng })
                onChange?.(e.latlng.lat, e.latlng.lng)
            },
        })
        return null
    }

    return (
        <Box sx={{ height: size, width: size }}>
            <MapContainer
                center={coordinate ? [coordinate.latitude, coordinate.longitude] : BRAZIL_CENTER}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickHandler />
                {editable && <MapUpdater position={position} />}
                {position && <Marker position={[position.latitude, position.longitude]} />}
            </MapContainer>
        </Box>
    )
}

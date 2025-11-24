import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

import type { GeoPoint } from '@/types'
import { Box } from '@mui/material'

const INITIAL_ZOOM = 2

type LocationViewerProps = {
    points: { id: string; location: GeoPoint }[]
    zoom?: number
    onClick?: (index: string) => void
}

export const LocationViewer = ({ points, zoom = INITIAL_ZOOM, onClick }: LocationViewerProps) => {
    const ClickHandler = () => {
        useMapEvents({ click() {} })
        return null
    }

    const firstPoint = points[0]?.location ?? null

    return (
        <Box sx={{ width: '100%', height: 600 }}>
            <MapContainer
                center={firstPoint ? [firstPoint.latitude, firstPoint.longitude] : [0, 0]}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickHandler />
                {points.map((p) => (
                    <Marker
                        key={p.id}
                        position={[p.location.latitude, p.location.longitude]}
                        eventHandlers={{
                            click: () => onClick?.(p.id),
                        }}
                    />
                ))}
            </MapContainer>
        </Box>
    )
}

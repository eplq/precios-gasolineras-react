import { MapContainer, TileLayer } from "react-leaflet";

export default function App() {

    return (
        <main className="flex h-screen w-screen">
            <div className="bg-red-500 h-full w-1/3 md:w-1/5"></div>
            <div className="bg-green-500 h-full flex-1 z-10">
                <MapContainer center={[51.5, 0]} zoom={13} className="z-10" style={{width: "100px", height: "100px"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </main>
    );
}
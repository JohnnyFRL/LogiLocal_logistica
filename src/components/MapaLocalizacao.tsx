
"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

interface PontoMapa {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  demanda: number;
}

interface Props {
  pontos: PontoMapa[];
  centro?: {
    latitude: number;
    longitude: number;
  } | null;
}

export default function MapaLocalizacao({
  pontos,
  centro = null,
}: Props) {
  return (
    <section className="rounded-xl border border-[#e2e5dc] bg-white p-6">
      <span className="text-xs font-semibold tracking-widest text-[#718472]">
        VISUALIZAÇÃO GEOGRÁFICA
      </span>

      <h3 className="mt-3 font-serif text-3xl text-[#26352c]">
        Mapa de localização
      </h3>

      <p className="mt-3 mb-6 text-sm text-[#68736a]">
        Visualize os pontos de demanda em uma região real.
      </p>

      <div className="h-[400px] w-full overflow-hidden rounded-lg">
        <MapContainer
          center={[-8.0476, -34.8770]}
          zoom={11}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {pontos.map((ponto) => (
            <CircleMarker
              key={ponto.id}
              center={[ponto.latitude, ponto.longitude]}
              radius={9}
              pathOptions={{
                color: "#354b3d",
                fillColor: "#627c64",
                fillOpacity: 1,
              }}
            >
              <Popup>
                <strong>{ponto.nome}</strong>
                <p>Demanda: {ponto.demanda} caixas/mês</p>
              </Popup>
            </CircleMarker>
          ))}

          {centro && (
            <CircleMarker
              center={[centro.latitude, centro.longitude]}
              radius={12}
              pathOptions={{
                color: "#ffffff",
                weight: 3,
                fillColor: "#e49b42",
                fillOpacity: 1,
              }}
            >
              <Popup>
                Centro de gravidade calculado
              </Popup>
            </CircleMarker>
          )}
        </MapContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-6 text-sm text-[#68736a]">
        <span>🟢 Pontos de demanda</span>
        <span>🟠 Centro de gravidade</span>
      </div>
    </section>
  );
}

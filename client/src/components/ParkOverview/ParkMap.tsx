import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { MdLocationOn } from "react-icons/md";
import { TbParkingCircleFilled } from "react-icons/tb";
import { renderToStaticMarkup } from "react-dom/server";
import type { LatLngExpression } from "leaflet";
import type { VisitorCenter } from "../../types/VisitorCenter";
import type { ParkingLot } from "../../types/ParkingLot";
import type { SelectedLocation } from "../../types/SelectedLocation";

interface ParkMapProps {
  visitorCenters: VisitorCenter[];
  parkingLots: ParkingLot[];
}

/* type SelectedLocation =
  | (VisitorCenter & { type: "visitorCenter" })
  | (ParkingLot & { type: "parkingLot" }); */

const ParkMap = ({ visitorCenters, parkingLots }: ParkMapProps) => {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  // Filter valid coordinates
  const validCenters = visitorCenters.filter(
    (vc) =>
      vc.latitude != null &&
      vc.longitude != null &&
      !isNaN(Number(vc.latitude)) &&
      !isNaN(Number(vc.longitude))
  );

  const validParkingLots = parkingLots
    .filter(
      (pl) =>
        pl.latitude != null &&
        pl.longitude != null &&
        !isNaN(Number(pl.latitude)) &&
        !isNaN(Number(pl.longitude))
    )
    .map((pl) => ({
      ...pl,
      latitude: Number(pl.latitude),
      longitude: -Math.abs(Number(pl.longitude)),
    }));

  // Count map center point
  const allLatitudes = [
    ...validCenters.map((vc) => Number(vc.latitude)),
    ...validParkingLots.map((pl) => Number(pl.latitude)),
  ];
  const allLongitudes = [
    ...validCenters.map((vc) => Number(vc.longitude)),
    ...validParkingLots.map((pl) => Number(pl.longitude)),
  ];

  const center: LatLngExpression =
    allLatitudes.length > 0
      ? [
          allLatitudes.reduce((sum, lat) => sum + lat, 0) / allLatitudes.length,
          allLongitudes.reduce((sum, lng) => sum + lng, 0) /
            allLongitudes.length,
        ]
      : [37.8, -96];

  useEffect(() => {
    const firstCenter = validCenters[0];
    const firstParkingLot = validParkingLots[0];

    if (!selectedLocation) {
      if (firstCenter) {
        setSelectedLocation({ ...firstCenter, type: "visitorCenter" });
      } else if (firstParkingLot) {
        setSelectedLocation({ ...firstParkingLot, type: "parkingLot" });
      }
    }
  }, [validCenters, validParkingLots, selectedLocation, setSelectedLocation]);

  // Ikoner med ram om vald
  const createLocationIcon = (vc: VisitorCenter) => {
    const isSelected =
      selectedLocation?.type === "visitorCenter" &&
      selectedLocation.id === vc.id;

    const markup = renderToStaticMarkup(
      <MdLocationOn
        style={{
          color: "black",
          border: isSelected ? "3px solid var(--color-primary)" : "none",
          borderRadius: "6px",
          background: "white",
        }}
        className="text-4xl"
      />
    );

    return L.divIcon({ html: markup, className: "" });
  };

  const createParkingLotIcon = (pl: ParkingLot) => {
    const isSelected =
      selectedLocation?.type === "parkingLot" && selectedLocation.id === pl.id;

    const markup = renderToStaticMarkup(
      <TbParkingCircleFilled
        style={{
          color: "black",
          border: isSelected ? "3px solid var(--color-primary)" : "none",
          borderRadius: "6px",
          background: "white",
        }}
        className="text-4xl"
      />
    );

    return L.divIcon({ html: markup, className: "" });
  };

  return (
    <div className="grid xl:grid-cols-2">
      {/* KARTA */}
      <div
        role="application"
        aria-label="Map showing visitor centers and parkinglots"
        className="shadow-md rounded-tl-2xl rounded-tr-2xl xl:rounded-bl-2xl 
        xl:rounded-tr-none"
      >
        <MapContainer
          center={center}
          zoom={10}
          scrollWheelZoom
          className="w-full h-70 lg:h-136 rounded-tr-2xl rounded-tl-2xl 
          xl:rounded-bl-2xl xl:rounded-tl-2xl xl:rounded-tr-none"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {/* Visitor centers */}
          {validCenters.map((vc) => (
            <Marker
              key={`vc-${vc.id}`}
              position={[Number(vc.latitude), Number(vc.longitude)]}
              icon={createLocationIcon(vc)}
              keyboard
              eventHandlers={{
                click: () => {
                  if (
                    selectedLocation?.type !== "visitorCenter" ||
                    selectedLocation.id !== vc.id
                  ) {
                    setSelectedLocation({ ...vc, type: "visitorCenter" });
                  }
                },
              }}
            />
          ))}

          {/* Parkinglots */}
          {validParkingLots.map((pl) => (
            <Marker
              key={`pl-${pl.id}`}
              position={[Number(pl.latitude), Number(pl.longitude)]}
              icon={createParkingLotIcon(pl)}
              keyboard
              eventHandlers={{
                click: () => {
                  if (
                    selectedLocation?.type !== "parkingLot" ||
                    selectedLocation.id !== pl.id
                  ) {
                    setSelectedLocation({ ...pl, type: "parkingLot" });
                  }
                },
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Information container (visitor centers and parkinglots) */}
      <div
        className="bg-[var(--color-primary)] rounded-tr-none rounded-bl-2xl 
        xl:rounded-bl-none xl:rounded-tr-2xl rounded-br-2xl 
      shadow-md p-4 text-white"
      >
        {/* Select menu */}
        <div
          className="bg-white text-black rounded-xl max-w-full mb-4 
        px-2"
        >
          <select
            value={selectedLocation?.id || ""}
            onChange={(e) => {
              const id = e.target.value;
              const vc = validCenters.find((v) => v.id === id);
              const pl = validParkingLots.find((p) => p.id === id);

              if (vc) setSelectedLocation({ ...vc, type: "visitorCenter" });
              else if (pl) setSelectedLocation({ ...pl, type: "parkingLot" });
            }}
            className="bg-transparent text-black py-2 w-full "
          >
            {/* Select options */}
            {validCenters.map((vc) => (
              <option key={vc.id} value={vc.id}>
                {vc.name}
              </option>
            ))}
            {validParkingLots.map((pl) => (
              <option key={pl.id} value={pl.id}>
                {pl.name}
              </option>
            ))}
          </select>
        </div>

        {selectedLocation ? (
          <>
            <h3 className="text-lg sm:text-xl font-black mb-2">
              {selectedLocation.name}
            </h3>
            <p className="mb-2 font-serif leading-relaxed">
              {selectedLocation.description}
            </p>

            {selectedLocation.type === "visitorCenter" &&
              selectedLocation.directionsInfo && (
                <div>
                  <h3 className="mb-2 font-black leading-relaxed text-lg">
                    Directions
                  </h3>
                  <p className="">{selectedLocation.directionsInfo}</p>
                </div>
              )}

            {selectedLocation.type === "parkingLot" &&
              selectedLocation.fees && (
                <div className="mt-3 text-sm text-gray-200">
                  <h3 className="font-black text-xl">Fees</h3>
                  <ul className="">
                    {selectedLocation.fees.length === 0 ? (
                      <li>No fee information available</li>
                    ) : (
                      selectedLocation.fees.map((fee, i) => (
                        <li key={i}>
                          {fee.title}:{" "}
                          {fee.description === "Free" || Number(fee.cost) === 0
                            ? "Free"
                            : `${fee.cost} USD`}{" "}
                          {fee.description && fee.description !== "Free"
                            ? `(${fee.description})`
                            : ""}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
          </>
        ) : (
          <p className="italic text-white">
            No visitor centers or parkinglots found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ParkMap;

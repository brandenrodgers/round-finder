import React, { useRef, useState } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Autocomplete, Slider, TextField } from "@mui/material";
import { GoogleMap } from "@react-google-maps/api";
import DistancePicker from "./inputs/DistancePicker";

const libraries: any[] = ["places"];
const LocationSearchBar = () => {
  const inputRef: any = useRef(null);
  const [distance, setDistance] = useState(30);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearByGolfCourses, setNearByGolfCourses] = useState([] as any);
  const key = ""; // Replace with your Google Maps API key

  const handleSliderChange = (event: Event, value: number | number[]) => {
    setDistance(value as number);
  };

  const handlePlaceSelect = async () => {
    if (!inputRef.current) return;
    const place = inputRef.current.getPlaces()[0];
    setCurrentLocation(place.formatted_address);
    if (place) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      const request = {
        location: place.geometry.location,
        radius: distance * 1609.32,
        type: "golf_course",
        keyword: "golf",
      };
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          if (results)
            setNearByGolfCourses(results.map((course) => course.name));
        } else {
          console.error("Nearby search request failed:", status);
        }
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <LoadScript googleMapsApiKey={key} libraries={libraries}>
        <GoogleMap></GoogleMap>
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceSelect}
        >
          <Autocomplete
            options={libraries}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter a location"
                variant="outlined"
                inputProps={{
                  style: {
                    width: "100%",
                    padding: ".5em",
                  },
                }}
              />
            )}
          />
        </StandaloneSearchBox>
      </LoadScript>
      <label htmlFor="distance" style={{ marginTop: ".5em" }}>
        Distance: {distance} miles
      </label>
      <DistancePicker value={distance} onChange={handleSliderChange} />
      {currentLocation && <h5>current location: {currentLocation}</h5>}
    </div>
  );
};

export default LocationSearchBar;

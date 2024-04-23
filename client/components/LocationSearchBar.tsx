import React, { useEffect, useRef, useState } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { GoogleMap } from "@react-google-maps/api";
import DistancePicker from "./inputs/DistancePicker";

type GeoCoordinates = {
  lat: number;
  lon: number;
}; // TODO: figure out why I cant put this in the type folder and export it

const libraries: any[] = ["places"];

interface LocationSearchBarInterface {
  location: GeoCoordinates;
  setLocation: (location: GeoCoordinates) => void;
  distance: number;
  setDistance: (distance: number) => void;
  unit: "km" | "mi";
  setUnit: (unit: any) => void;
}

const LocationSearchBar = (props: LocationSearchBarInterface) => {
  const { location, setLocation, distance, setDistance, unit, setUnit } = props;
  const inputRef: any = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearByGolfCourses, setNearByGolfCourses] = useState([] as any);
  const [locationName, setLocationName] = useState("Using Current location");
  const key = ""; // Replace with your Google Maps API key

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 1) {
      setDistance(value);
    }
  };

  const handleUnitClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setUnit((prev: "km" | "mi") => {
      if (prev === "mi") {
        return "km";
      }
      return "mi";
    });
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            lat: latitude,
            lon: longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationName("Enter location or enable location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: ".5em",
          width: "240px",
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
              value={locationName}
              renderInput={(params) => (
                <TextField {...params} label={"Location"} variant="outlined" />
              )}
            />
          </StandaloneSearchBox>
        </LoadScript>
      </div>
      <TextField
        type="number"
        label={"Distance"}
        value={distance}
        style={{ paddingRight: ".5em", width: "140px" }}
        onChange={handleDistanceChange}
        inputProps={{ min: 1 }}
        InputProps={{
          endAdornment: (
            <div onClick={handleUnitClick}>
              <InputAdornment position="end">{unit}</InputAdornment>
            </div>
          ),
        }}
      />
      {currentLocation && <h5>current location: {currentLocation}</h5>}
    </div>
  );
};

export default LocationSearchBar;

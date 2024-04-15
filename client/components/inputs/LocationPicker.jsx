async function fetchAutoCompletePredictions(input) {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input: input, // User input (partial address or place)
          types: "(regions)", // Optional: Specify types of predictions (e.g., 'geocode', 'establishment')
          language: "en", // Optional: Specify language for predictions
          key: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg", // Replace 'YOUR_API_KEY' with your actual Google Maps API key
        },
      }
    );
    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching autocomplete predictions:", error);
    return [];
  }
}

const LocationPicker = () => {
  return (
    <div>
      <button onClick={() => fetchAutoCompletePredictions("derry")}>
        fetch
      </button>
      hello
    </div>
  );
};

export default LocationPicker;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { mapService } from '../../services/mapService';
import { theme } from '../../utils/theme';

export default function MapScreen() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const response = await mapService.getVehicleLocations();
    if (response.success) {
      setLocations(response.data);
    }
    setLoading(false);
  };

  const getMarkerColor = (status) => {
    switch (status) {
      case 'ON':
        return 'green';
      case 'MOVING':
        return 'blue';
      case 'OFF':
      default:
        return 'red';
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.209,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {locations.map((location) => {
          if (!location.lat || !location.lng) return null;
          return (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.lat,
                longitude: location.lng,
              }}
              pinColor={getMarkerColor(location.status)}
              title={`Battery: ${location.batteryPercent}%`}
              description={`Status: ${location.status}`}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

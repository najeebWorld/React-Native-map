import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Button } from "react-native";
import * as Location from "expo-location";

export default function App() {
	const [showMap, setShowMap] = useState(false);
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				let { status } = await Location.requestForegroundPermissionsAsync();
				console.log("STATUS", status);

				if (status !== "granted") {
					console.log("in ifff");

					setErrorMsg("Permission to access location was denied");

					return;
				}
				console.log("here");
				let location = await Location.getLastKnownPositionAsync({});
				console.log("location", location);
				setLocation(location);
			} catch (e) {
				console.log("error", e);
			}
		})();

		console.log("end");
	}, []);

	return (
		<View style={styles.container}>
			{showMap ? (
				<View style={styles.mapContainer}>
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					/>
					<Button
						title="Back"
						onPress={() => setShowMap(false)}
						style={styles.backButton}
					/>
				</View>
			) : (
				<Button title="Show Map" onPress={() => setShowMap(true)} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	mapContainer: {
		...StyleSheet.absoluteFillObject,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	backButton: {
		position: "absolute",
		bottom: 20,
		alignSelf: "center",
	},
});

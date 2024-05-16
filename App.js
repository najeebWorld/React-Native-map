import React, { useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Button } from "react-native";

export default function App() {
	const [showMap, setShowMap] = useState(false);

	return (
		<View style={styles.container}>
			{showMap ? (
				<View style={styles.mapContainer}>
					<MapView style={styles.map} />
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

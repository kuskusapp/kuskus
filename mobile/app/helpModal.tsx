import { Linking, Text, TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

export default function helpModal() {
	return (
		<ScrollView>
			<TouchableOpacity
				onPress={() => {
					Linking.openURL("https://github.com/kuskusapp/kuskus")
				}}
			>
				<Text style={{ color: "blue" }}>Check GitHub for code.</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}

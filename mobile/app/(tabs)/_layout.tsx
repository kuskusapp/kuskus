import { Octicons } from "@expo/vector-icons"
import Feather from "@expo/vector-icons/build/Feather"
import { Tabs } from "expo-router"
import React from "react"

import { TabBarButton } from "@/components/TabBarButton"
import { ThemedText, useThemeColor } from "@/components/Themed"
import { theme } from "@/theme"

export default function TabLayout() {
	const tabBarBackgroundColor = useThemeColor({
		light: theme.colorWhite,
		dark: theme.colorBlack,
	})

	const tabBarActiveTintColor = useThemeColor({
		light: theme.colorBlack,
		dark: theme.colorWhite,
	})

	const tabBarInactiveTintColor = useThemeColor({
		light: theme.colorGrey,
		dark: `rgba(255, 255, 255, 0.35)`,
	})

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor,
				tabBarInactiveTintColor,
				tabBarStyle: {
					backgroundColor: tabBarBackgroundColor,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					tabBarButton: (props) => (
						<TabBarButton
							{...props}
							activeTintColor={tabBarActiveTintColor}
							inactiveTintColor={tabBarInactiveTintColor}
							icon={({ color }) => (
								<Octicons name="home" size={24} color={color} />
							)}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="bookmarks"
				options={{
					headerStyle: {
						backgroundColor: tabBarBackgroundColor,
					},
					headerTitle: () => (
						<ThemedText fontSize={20} fontWeight="bold">
							Bookmarks
						</ThemedText>
					),
					tabBarButton: (props) => (
						<TabBarButton
							{...props}
							activeTintColor={tabBarActiveTintColor}
							inactiveTintColor={tabBarInactiveTintColor}
							icon={({ color }) => (
								<Feather name="bookmark" size={24} color={color} />
							)}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="info"
				options={{
					headerStyle: {
						backgroundColor: tabBarBackgroundColor,
					},
					headerTitle: () => (
						<ThemedText fontSize={20} fontWeight="bold">
							Settings
						</ThemedText>
					),
					tabBarButton: (props) => (
						<TabBarButton
							{...props}
							activeTintColor={tabBarActiveTintColor}
							inactiveTintColor={tabBarInactiveTintColor}
							icon={({ color }) => (
								<Feather size={24} name="settings" color={color} />
							)}
						/>
					),
				}}
			/>
		</Tabs>
	)
}

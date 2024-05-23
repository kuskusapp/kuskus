import { Octicons } from "@expo/vector-icons"
import Feather from "@expo/vector-icons/build/Feather"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Tabs } from "expo-router"
import React, { useState } from "react"
import { TabBarButton } from "../../components/TabBarButton"
import { ThemedText, useThemeColor } from "../../components/Themed"
import { theme } from "../../theme"
import { TrpcProvider, trpcClient } from "../../utils/trpc-client"

export default function TabLayout() {
	const [queryClient] = useState(() => new QueryClient())

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
		<>
			<TrpcProvider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
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
						{/* <Tabs.Screen
				name="auth"
				options={{
					headerStyle: {
						backgroundColor: tabBarBackgroundColor,
					},
					headerTitle: () => (
						<ThemedText fontSize={20} fontWeight="bold">
							Auth
						</ThemedText>
					),
					tabBarButton: (props) => (
						<TabBarButton
							{...props}
							activeTintColor={tabBarActiveTintColor}
							inactiveTintColor={tabBarInactiveTintColor}
							icon={({ color }) => (
								<Feather size={24} name="heart" color={color} />
							)}
						/>
					),
				}}
			/> */}
					</Tabs>
				</QueryClientProvider>
			</TrpcProvider>
		</>
	)
}

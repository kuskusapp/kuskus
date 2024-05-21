import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import { differenceInMinutes } from "date-fns"
import * as Notifications from "expo-notifications"
import * as QuickActions from "expo-quick-actions"
import { usePathname, useRouter } from "expo-router"
import { Stack } from "expo-router/stack"
import { StatusBar } from "expo-status-bar"
import { setBackgroundColorAsync } from "expo-system-ui"
import { useEffect, useState } from "react"
import { Platform, useColorScheme } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { theme } from "../theme"
import { useKuskusStore } from "../store/kuskusStore"
import { useQuickActionCallback } from "../utils/useQuickActionCallback"
import { AnimatedBootSplash } from "../components/AnimatedBootSplash"
import { ThemedText } from "../components/Themed"
import { OfflineBanner } from "../components/OfflineBanner"

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

export default function Layout() {
	const [splashVisible, setSplashVisible] = useState(true)
	const router = useRouter()
	const pathName = usePathname()
	const colorScheme = useColorScheme() || "light"

	const { refreshData, lastRefreshed } = useKuskusStore()

	// Keep the root view background color in sync with the current theme
	useEffect(() => {
		setBackgroundColorAsync(
			colorScheme === "dark" ? theme.colorDarkBlue : theme.colorWhite,
		)
	}, [colorScheme])

	useEffect(() => {
		QuickActions.setItems([
			{
				title: "Issues with KusKus?",
				subtitle: "Tell us and we will fix or add it for you",
				icon: Platform.OS === "ios" ? "symbol:gift" : "gift",
				id: "0",
				params: { href: "/helpModal" },
			},
		])
	}, [])

	const lastNotificationResponse = Notifications.useLastNotificationResponse()
	useEffect(() => {
		if (
			lastNotificationResponse &&
			lastNotificationResponse.actionIdentifier ===
				Notifications.DEFAULT_ACTION_IDENTIFIER
		) {
			try {
				const url =
					lastNotificationResponse.notification.request.content.data.url
				if (pathName !== url) {
					router.push(url)
				}
			} catch {}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastNotificationResponse])

	useQuickActionCallback((action) => {
		const href = action.params?.href
		if (href && typeof href === "string") {
			router.navigate(href)
		}
	})

	useEffect(() => {
		const fetchData = async () => {
			if (
				!lastRefreshed ||
				differenceInMinutes(new Date(), new Date(lastRefreshed)) > 5
			) {
				await refreshData()
			}
		}

		fetchData()
	}, [lastRefreshed, refreshData])

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ActionSheetProvider>
				<AnimatedBootSplash
					animationEnded={!splashVisible}
					onAnimationEnd={() => {
						setSplashVisible(false)
					}}
				>
					<ThemeProvider
						value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
					>
						<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

						<Stack>
							<Stack.Screen
								name="(tabs)"
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name="helpModal"
								options={{
									presentation: "modal",
									title: "Secret Modal",
									headerTitleAlign: "center",
									headerTitle: (props) => (
										<ThemedText fontSize={24} fontWeight="bold">
											{props.children}
										</ThemedText>
									),
									...(colorScheme === "dark"
										? {
												headerStyle: { backgroundColor: theme.colorDarkBlue },
												headerTitleStyle: { color: "white" },
											}
										: {}),
								}}
							/>
						</Stack>
						<OfflineBanner />
					</ThemeProvider>
				</AnimatedBootSplash>
			</ActionSheetProvider>
		</GestureHandlerRootView>
	)
}

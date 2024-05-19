import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type KuskusState = {
	isRefreshing?: boolean
	lastRefreshed: string | null
	refreshData: (options?: { ttlMs?: number }) => Promise<void>
	shouldUseLocalTz: boolean
	toggleLocalTz: () => void
}

export const useKuskusStore = create(
	persist<KuskusState>(
		(set, get) => ({
			isRefreshing: false,
			lastRefreshed: null,
			shouldUseLocalTz: false,
			refreshData: async (options) => {},
			toggleLocalTz: () => {
				set((state) => ({ shouldUseLocalTz: !state.shouldUseLocalTz }))
			},
		}),
		{
			name: "kuskus-store",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => {
				const { isRefreshing: _, ...dataToPersist } = state
				return dataToPersist
			},
		},
	),
)

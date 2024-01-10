import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

type AuthStoreType = {
  accessToken?: string;
  tokenType?: string;
  setLogin: (accessToken: string, tokenType: string) => void;
  clear: () => void;
};

type PersistAuthStoreType = (
  config: StateCreator<AuthStoreType>,
  ooptions: PersistOptions<AuthStoreType>
) => StateCreator<AuthStoreType>;

export const useAuthStore = create<AuthStoreType>(
  (persist as PersistAuthStoreType)(
    (set) => ({
      setLogin: (accessToken, tokenType) => set({ accessToken, tokenType }),
      clear: () => set({ accessToken: undefined, tokenType: undefined }),
    }),
    {
      name: "nft-membership-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

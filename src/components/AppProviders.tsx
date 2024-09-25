import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MenuContextProvider from "../context/MenuContext.tsx";
import { ThemeContextProvider } from "../context/ThemeContext";
import EditAlbumProvider from "../context/EditAlbumContext.tsx";
import ExpandedImageProvider from "../context/ExpandedImageContext.tsx";
import { TimeGeoContextProvider } from "../context/TimeGeoContext.tsx";

const queryClient = new QueryClient();

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <MenuContextProvider>
          <EditAlbumProvider>
            <ExpandedImageProvider>
              <TimeGeoContextProvider>{children}</TimeGeoContextProvider>
            </ExpandedImageProvider>
          </EditAlbumProvider>
        </MenuContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

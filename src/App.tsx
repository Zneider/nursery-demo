import { QueryClientProvider } from "@tanstack/react-query";
import { ChildrenOverview } from "./components/ChildrenOverview";
import { queryClient } from "./client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="bg-grey-300 h-full w-full">
        <ChildrenOverview />
      </main>
    </QueryClientProvider>
  );
}

export default App;

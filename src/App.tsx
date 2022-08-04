import Header from "~/components/header";
import Footer from "~/components/footer";

function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-columns-[100%] min-h-[100%]">
      <Header />
      <main className="grid">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold">Burrow landing page</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

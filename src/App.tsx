import Header from "~/components/header";
import Footer from "~/components/footer";
import Main from "~/components/main";

function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-columns-[100%] min-h-[100%]">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

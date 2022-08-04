import Layout from "~/components/layout";
import Header from "~/components/header";
import Footer from "~/components/footer";

function App() {
  return (
    <Layout>
      <Header />
      <main>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-2xl font-bold">Burrow landing page</h1>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}

export default App;

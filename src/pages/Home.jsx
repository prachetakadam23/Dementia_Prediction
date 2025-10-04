// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "../i18n/LanguageContext";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const dementiaStats = t('home').stats || [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow py-20 px-4 md:px-20">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 text-center">
          {t('app.title')}
        </h1>
        <p className="text-gray-700 mb-10 text-center max-w-2xl">
          {t('home.subtitle')}
        </p>
        <button
          onClick={() => navigate("/speech")}
          className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105 shadow-lg"
        >
          {t('app.start_button')}
        </button>

        {/* Dementia Statistics Section */}
        <section className="mt-20 w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">
            {t('home.stats_title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {dementiaStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 bg-red-50 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold mb-4 text-red-600">{stat.title}</h3>
                <p className="text-gray-700">{stat.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

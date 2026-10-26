import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import EcoCorner from '@/components/EcoCorner';
import Walkway from '@/components/Walkway';
import Location from '@/components/Location';
import SheetData from '@/components/SheetData';
import Footer from '@/components/Footer';
import AmbientSound from '@/components/AmbientSound';

export default function App() {
  return (
    <div id="top" className="relative min-h-screen bg-paper-100">
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <EcoCorner />
        <Walkway />
        <Location />
        <SheetData />
      </main>
      <Footer />
      <AmbientSound />
    </div>
  );
}

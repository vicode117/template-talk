import { Routes, Route } from 'react-router-dom';
import { HomeScreen } from '@/components/HomeScreen';
import TemplateTalkApp from '@/apps/template-talk/TemplateTalkApp';
import CalendarApp from '@/apps/calendar/CalendarApp';
import HospitalBagApp from '@/apps/hospital-bag/HospitalBagApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/template-talk" element={<TemplateTalkApp />} />
      <Route path="/calendar" element={<CalendarApp />} />
      <Route path="/hospital-bag" element={<HospitalBagApp />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import { HomeScreen } from '@/components/HomeScreen';
import TemplateTalkApp from '@/apps/template-talk/TemplateTalkApp';
import CalendarApp from '@/apps/calendar/CalendarApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/template-talk" element={<TemplateTalkApp />} />
      <Route path="/calendar" element={<CalendarApp />} />
    </Routes>
  );
}

export default App;

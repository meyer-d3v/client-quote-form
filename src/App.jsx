import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuoteForm from './QuoteForm'
import Login from './login'
import Admin from './admin'
// ... your other imports

function App() {
  return (
      <Routes>
        {/* Your existing routes */}
        <Route path="/" element={<QuoteForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
  );
}

export default App;
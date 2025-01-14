import { AuthProvider } from './Auth/AuthContext';
import Routers from './Routers/Routers';

function App() {

  return (
    <AuthProvider>
      <Routers />
    </AuthProvider>

  );
}

export default App;

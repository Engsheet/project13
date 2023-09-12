import { Toaster } from "react-hot-toast";
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

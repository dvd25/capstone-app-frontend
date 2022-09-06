import './App.css';
import Blog from './components/Blog/Blog';
import ResponsiveAppBar from './components/NavigationBar';





function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      {/* <Homepage /> */}
      <Blog/>
    </div>
  );
}

export default App;

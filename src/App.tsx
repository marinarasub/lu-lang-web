import logo from './logo.svg';
import './App.css';

import {
  Button,
  DatePicker,
  Divider,
  Layout,
  version
} from "antd";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AboutPage from "./pages/AboutPage"
import EditorPage from "./pages/EditorPage"
import Navbar from './components/Navbar';
import DocsPage from './pages/DocsPage';

import "@fontsource/fira-code";
import "@fontsource/fira-sans";
import "@fontsource/bitter";

const { Header, Content, Footer} = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header style={{top: 0, width: "100%", margin: 0}}>
          <div className="navbar" style={{minHeight: "100%"}}>
            <Navbar />
          </div>
        </Header>
        <Content>
        <Routes>
          <Route path='/' element={<AboutPage />} />
          <Route path='/editor' element={<EditorPage />} />
          <Route path='/docs' element={<DocsPage />} />
        </Routes>
        </Content>
        <Divider />
        <Footer style={{margin: 'auto', textAlign: 'center', height: "100%", width: "100%"}}>
          By David Lu (C) 2025
        </Footer>
      </Layout>
      
    </BrowserRouter>
  );
}

export default App;
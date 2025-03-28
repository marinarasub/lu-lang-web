import logo from './logo.svg';
import './App.css';

import {
  Button,
  ConfigProvider,
  DatePicker,
  Divider,
  Layout,
  Space,
  Typography,
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
import "@fontsource/merriweather";
import { GithubFilled, MailFilled, LinkedinFilled } from '@ant-design/icons';
import NotFoundPage from './pages/NotFoundPage';

const { Paragraph, Link } = Typography;
const { Header, Content, Footer} = Layout;

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Bitter, Merriweather, Garamond, Times New Roman, serif',
          fontFamilyCode: 'Fira Code, Consolas, monospace',
        }
      }}>
      <BrowserRouter>
        <Layout style={{minHeight: '100vh'}} >
          <Header style={{ top: 0, width: "100%", margin: 0 }}>
            <div className="navbar" style={{ minHeight: "100%" }}>
              <Navbar />
            </div>
          </Header>
          <Content>
            <Routes>
              <Route path='/' element={<AboutPage />} />
              <Route path='/editor' element={<EditorPage />} />
              <Route path='/docs' element={<DocsPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Content>
          <Divider />
          <Footer style={{ margin: 'auto', textAlign: 'center', height: "100%", width: "100%" }}>
            <Space direction='vertical' size='middle'>
              <Space direction='horizontal' size='small'>
                <Button type="link" href="https://github.com/marinarasub/lu-lang-web" target="_blank" rel="noopener noreferrer" icon={<GithubFilled />}>
                  Website Source
                </Button>
                <Button type="link" href="mailto:ludavid@student.ubc.ca" target="_blank" rel="noopener noreferrer" icon={<MailFilled />}>
                  Email Me
                </Button>
                <Button type="link" href="https://www.linkedin.com/in/ludavid3" target="_blank" rel="noopener noreferrer" icon={<LinkedinFilled />}>
                  LinkedIn
                </Button>
              </Space>
              <Paragraph>By David Lu © 2025</Paragraph>
            </Space>
          </Footer>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
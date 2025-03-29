import {
  Button,
  ConfigProvider,
  Divider,
  Layout,
  Space,
  Typography
} from "antd";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AboutPage from "./pages/HomePage"
import EditorPage from "./pages/EditorPage"
import Navbar from './components/Navbar';
import DocsPage from './pages/DocsPage';
import ForumPage from './pages/ForumPage';

import "@fontsource/fira-code";
import "@fontsource/fira-sans";
import "@fontsource/bitter";
import "@fontsource/merriweather";
import { GithubFilled, MailFilled, LinkedinFilled } from '@ant-design/icons';
import NotFoundPage from './pages/NotFoundPage';
import { EMAIL_URL, LINKEDIN_URL, SOURCE_URL } from './constants/socialAddresses';
import NewsPage from './pages/NewsPage';

const { Paragraph } = Typography;
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
            <Navbar />
          </Header>
          <Content>
            <Routes>
              <Route path='/' element={<AboutPage />} />
              <Route path='/editor' element={<EditorPage />} />
              <Route path='/docs' element={<DocsPage />} />
              <Route path='/forum' element={<ForumPage />} />
              <Route path='/news' element={<NewsPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Content>
          <Divider />
          <Footer style={{ margin: 'auto', textAlign: 'center', height: "100%", width: "100%" }}>
            <Space direction='vertical' size='middle'>
              <Space direction='horizontal' size='small'>
                <Button type="link" href={SOURCE_URL} target="_blank" rel="noopener noreferrer" icon={<GithubFilled />}>
                  Website Source
                </Button>
                <Button type="link" href={EMAIL_URL} target="_blank" rel="noopener noreferrer" icon={<MailFilled />}>
                  Email Me
                </Button>
                <Button type="link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" icon={<LinkedinFilled />}>
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
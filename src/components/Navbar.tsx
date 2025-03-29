import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { SOURCE_URL } from "../constants/socialAddresses";

const navLinks = [
    { key: 'editor', label: 'Editor', to: '/editor' },
    { key: 'docs', label: 'Documentation', to: '/docs' },
    //{ key: 'source', label: 'Source', to: SOURCE_URL },
    { key: 'forum', label: 'Forum', to: '/forum' },
    { key: 'news', label: 'News', to: '/news' },
]

function Navbar() {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const handleClick = (e: { key: string; }) => {
        // Check if the clicked item is the one you want to exclude from highlighting
        if (e.key !== 'logo') {
            setSelectedKeys([e.key]); // Highlight the clicked item
        } else {
            setSelectedKeys([]); // Remove the highlight
        }
    }

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setSelectedKeys([]);
        } else {
            setSelectedKeys([]);
            for (let item of navLinks) {
                if (path.includes(item.to)) {
                    setSelectedKeys([item.key]);
                    break;
                }
            }
        }
    }, [location]);

    return (
        <nav>
            <Menu 
                mode="horizontal" 
                theme="dark" 
                style={{ fontFamily: 'Fira Code, Consolas, monospace' }}
                selectedKeys={selectedKeys} onClick={handleClick}>
                <Menu.Item key='logo' style={{ marginRight: 'auto', fontSize: '20pt', fontFamily: 'Bitter, Fira Sans, Open Sans, Roboto, sans-serif' }}>
                    <NavLink to='/'><b>「 Lu 」</b></NavLink>
                </Menu.Item>
                {navLinks.map(item => (
                    <Menu.Item key={item.key}>
                        <NavLink to={item.to}>{item.label}</NavLink>
                    </Menu.Item>
                ))}
            </Menu>
        </nav>
    );
}

export default Navbar;
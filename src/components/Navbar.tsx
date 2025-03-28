import { NavLink } from "react-router-dom";
import { Menu, Space } from "antd";
import { CSSProperties, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SOURCE_URL } from "../constants/addresses";

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
        } else if (path === '/editor') {
            setSelectedKeys(['editor']);
        } else if (path === '/docs') {
            setSelectedKeys(['docs']);
        } else if (path === '/contact') {
            setSelectedKeys(['contact']);
        } else {
            setSelectedKeys([]);
        }
    }, [location]);

    return (
    <nav>
        <Menu 
            mode="horizontal" 
            theme="dark" 
            style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Fira Code, Consolas, monospace' }}
            selectedKeys={selectedKeys} onClick={handleClick}>
            <Menu.Item key='logo' style={{ marginRight: 'auto', fontSize: '20pt', fontFamily: 'Bitter, Fira Sans, Open Sans, Roboto, sans-serif' }}>
                <NavLink to='/'><b>「 Lu 」</b></NavLink>
            </Menu.Item>
            <Menu.Item key='editor'>
                <NavLink to='/editor'>Editor</NavLink>
            </Menu.Item>
            <Menu.Item key='docs'>
                <NavLink to='/docs'>Documentation</NavLink>
            </Menu.Item>
            <Menu.Item key='source'>
                <NavLink to={SOURCE_URL}>Source</NavLink>
            </Menu.Item>
            <Menu.Item key='blog'>
                <NavLink to='/blog'>Blog</NavLink>
            </Menu.Item>
        </Menu>
    </nav>
    );
}

export default Navbar;
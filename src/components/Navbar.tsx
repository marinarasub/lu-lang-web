import { NavLink } from "react-router-dom";
import { Menu, Space } from "antd";
import { CSSProperties, useState } from "react";

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

    return (
    <nav>
        <Menu 
            mode="horizontal" 
            theme="dark" 
            style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Fira Code, Consolas, monospace' }}
            selectedKeys={selectedKeys} onClick={handleClick}>
            <Menu.Item key='logo' style={{ marginRight: 'auto', fontSize: '20pt', fontFamily: 'Bitter, Fira Sans, Open Sans, Roboto, sans-serif' }}>
                <NavLink to='/'><b>Lu</b></NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to='/editor'>Editor</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to='/docs'>Documentation</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to='/'>Source</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to='/contact'>Contact</NavLink>
            </Menu.Item>
        </Menu>
    </nav>
    );
}

export default Navbar;
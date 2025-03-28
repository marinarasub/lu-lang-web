import Typography from "antd/es/typography";
import Image from "antd/es/image";
import { Button, Space } from "antd";

const { Title, Text } = Typography;

function NotFoundPage() {
    const goBack = () => {
        window.history.back();
    }
    return (
        <div style={{ padding: "20px", textAlign: "center", alignItems: 'center' }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={1} style={{fontSize: '144pt', margin: '0.33em 0 0 0'}}>
                    404
                </Title>
                <Text style={{fontSize: '16pt'}}>Oops... looks like it's just you here</Text>
                <Button type="link" size="large" onClick={goBack}>Go Back</Button>
                <Image src={`${process.env.PUBLIC_URL}/mars-svgrepo-com.svg`} width='20%' preview={false} />
            </Space>
        </div>
    );
}

export default NotFoundPage;
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,LogoutOutlined
  } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { userStore } from '../../store/usersStore';
const { Header, Sider, Content, Footer } = Layout;

const arrModulos = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Usuários',
    },
    {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: 'Ponto Eletrônico',
    },
];
const Dashboard  = () => {

    const  {signOut, user, isOpenNav, setIsOpenNav} = userStore((state) => { return {signOut:state.signOut , isOpenNav: state.isOpenNav, setIsOpenNav: state.setIsOpenNav, user: state.user}});

    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    const modulos = user?.is_admin === 1 ? arrModulos : arrModulos.filter(m => m.key !== '1');
    return (
        <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
        <Sider trigger={null} collapsible   breakpoint="md" 
        onBreakpoint={(broken) => {setIsOpenNav(!broken)}} collapsed={!isOpenNav} 
        style={{padding: '10px 0px 10px 0px'}}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={user?.is_admin === 1 ? ['1'] : ['2']}
            items={modulos}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
            <Button
              type="text"
              icon={isOpenNav ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setIsOpenNav(!isOpenNav)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={signOut}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px', padding: 24, minHeight: '40vh',
              background: colorBgContainer, borderRadius: borderRadiusLG,
              }}>
            {/* Content */}
          </Content>
          <Footer style={{ textAlign: 'center', }}>
          Desafio Logique ©{new Date().getFullYear()} Created by Edson Cândido
        </Footer>
        </Layout>
      </Layout>
    );
}

export default Dashboard
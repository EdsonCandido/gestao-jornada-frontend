import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,LogoutOutlined
  } from '@ant-design/icons';
import { Layout, Menu, Button, theme, Flex } from 'antd';
import { userStore } from '../../store/usersStore';
import { useNavigate } from 'react-router-dom';
import ListUsers from '../../components/ListUsers';
import { useState } from 'react';
import ListJourneyPoints from '../../components/ListJourneyPoints';
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
const Dashboard  = ({}: any) => {

  const [router, setRouter] = useState(1);

    const  {signOut, user, isOpenNav, setIsOpenNav} = userStore((state) => { return {signOut:state.signOut , isOpenNav: state.isOpenNav, setIsOpenNav: state.setIsOpenNav, user: state.user}});
const navigate = useNavigate();
    const handlerSignOut = () => {
        signOut();
        navigate('/login');
    }

    const handlerNavigate = (element: number) => {
      setRouter(element)
    } 

    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    const modulos = user?.is_admin === 1 ? arrModulos : arrModulos.filter(m => m.key !== '1');
    return (
        <Layout style={{background: '#e9e5e5d1', minHeight: '100vh', minWidth: '100vw', padding: '10px'}}>
        <Sider trigger={null} collapsible   breakpoint="md" 
        onBreakpoint={(broken) => {setIsOpenNav(!broken)}} collapsed={!isOpenNav} 
        style={{padding: '10px 0px 10px 0px', marginRight: '10px', borderRadius: borderRadiusLG}}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={user?.is_admin === 1 ? ['1'] : ['2']}
            items={modulos}
            onClick={(e) => handlerNavigate(Number(e.key))}
            style={{ borderRadius: borderRadiusLG}}
          />
        </Sider>
        <Layout style={{ background: '#e9e5e5d1'}}>
          <Header style={{ padding: 0,borderRadius: borderRadiusLG, 
            background: colorBgContainer, display: 'flex', flexDirection: 'row', 
            justifyContent:'space-between' }}>
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
            <Flex align='center'>
            <p>Olá <a>{user?.name}</a></p>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handlerSignOut}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
            }}
            />
            </Flex>
          </Header>
          <Content
            style={{
              margin: '24px 0px', padding: 24, minHeight: '40vh',
              background: colorBgContainer, borderRadius: borderRadiusLG,
              }}>
            {
router === 1 ? <ListUsers/>: <ListJourneyPoints />
            }            
          </Content>
          <Footer style={{ background: colorBgContainer, 
            textAlign: 'center', borderRadius: borderRadiusLG, margin:0 }}>
          Desafio Logique ©{new Date().getFullYear()} Created by Edson Cândido
        </Footer>
        </Layout>
      </Layout>
    );
}

export default Dashboard
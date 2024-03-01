import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { LabProgress } from "../Redux/hook";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/ext-language_tools";

import {  Button, 
    notification, 
    Layout, 
    Table
 } from 'antd';

import {  
    LogoutOutlined,
} from '@ant-design/icons';

import { Content } from "antd/es/layout/layout";

const { Header,Footer } = Layout;

export const LabProgressPage = () => {

    const {LabName2} = useParams();

    const [username, setUsername] = useState('')
    const [tag, settag] = useState('')

    const [currentLabProgress, setCurrentLabProgress] = useState<LabProgress[]>([])

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }
        }).then(res => { 
            console.log(res)
            if (res.data.message === "AUTHENTICATED") {
                setUsername(res.data.username)
                settag(res.data.userTag)
            } else {
                navigate('/MainPage')
            }
         })

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/getLabProgress/${LabName2}`);
                const data = response.data;
      
                if (data === "LAB_NOT_FOUND") {
                    errorNotify("That lab does not exist");
                    setTimeout(() => {
                    navigate("/Home");
                    }, 150);
                } else {
                    setCurrentLabProgress(data);
                }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
        fetchData();

    }, [])

    const errorNotify = (Arg: string) => {
        notification.error({
            message: 'Error!',
            description: Arg,
            placement: 'topLeft'
          })
    }

    const logout = () => {
        localStorage.removeItem("token");
        setTimeout(function timer() {
            navigate("/MainPage")
        }, 150);        
    }

    if (!currentLabProgress || currentLabProgress.length === 0) {
        return <div>Loading...</div>; 
    }

    const columnNames = Object.keys(currentLabProgress[0]).filter(key => key !== 'user_name');
    
    const columns = [
        {
          title: 'User Name',
          dataIndex: 'user_name',
          key: 'user_name',
        },
        ...columnNames.map(columnName => ({
          title: columnName,
          dataIndex: columnName,
          key: columnName,
        })),
    ];
    
    return (
        <div> 
            <Helmet>
                <title>Lab Progress</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet> 

            <Layout>
            <Header style={{padding: 0}}>
                <div style={{float: "right", fontSize:'16px'}}>
                        <span style={{color: 'white'}}>{username} ({tag})</span>
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={logout}
                            style={{
                                width: 64,
                                height: 64,
                                color: 'white'
                            }}
                        />
                </div>
            </Header>   

            <Content style={{
                margin: '50px',
                minHeight: '853px', 
                alignContent: 'center'   
            }}>

            <Table dataSource={currentLabProgress} columns={columns} />

            </Content>
            <title>User Data Table</title>
            <Footer style={{textAlign: 'center'}}>
                Created with love by MomorioUHT UwU
            </Footer>

        </Layout>  
        </div>
    )
}
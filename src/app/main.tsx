import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {lightTheme} from "./theme.ts";
import {ConfigProvider} from "antd";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ConfigProvider theme={lightTheme}>
            <App/>
        </ConfigProvider>
    </BrowserRouter>
)

import type { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components';
import { TexturesPage, ModelsPage, MaterialsPage } from './pages';
import './app.css';

export const App: FunctionComponent = (): JSX.Element => {
    return (
        <>
            <Header />
            
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Navigate to='/textures' />}/>
                    <Route path='/textures' element={<TexturesPage />}/>
                    <Route path='/models' element={<ModelsPage />}/>
                    <Route path='/materials' element={<MaterialsPage />}/>
                </Routes>
            </div>
        </>
    );
};
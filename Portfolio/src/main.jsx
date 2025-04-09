import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Firstmain from '../src/components/firstmain';
import About from '../src/components/about/about';
import Contact from '../src/components/contact/contact';
import Projects from '../src/components/projects/projects';
import Skills from '../src/components/skill/skill';

const routing= createBrowserRouter([
{
  path:'/',
  element:<Firstmain/>
},
{
  path:'/about',
  element:<About/>
},
{
  path:'/contact',
  element:<Contact/>
},
{
  path:'/skills',
  element:<Skills/>
},
{
  path:'/projects',
  element:<Projects/>
}]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routing}/>
  </StrictMode>
)

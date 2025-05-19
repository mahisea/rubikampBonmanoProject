import { UserContext } from '@/context/UserContext';
import PanelLayout from '@/layout/PanelLayout/PanelLayout';
import HomePage from '@/pages/client/Home/HomePage';
import ProductDetailPage from '@/pages/client/ProductDetailPage/ProductDetailPage';
import AuthPage from '@/pages/panel/Auth/Auth';
import PanelPage from '@/pages/panel/PanelPage';
import MyProfile from '@/pages/panel/Profile/MyProfile/MyProfile';
import ProfileUsers from '@/pages/panel/Profile/Users/ProfileUsers';
import ProfileProduct from '@/pages/panel/Profile/Product/ProfileProduct'
import links from '@/routes/links';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
const client_pages = [
  {
    path: links.client.home,
    element: <HomePage />,
  },
  {
    path: links.client.auth,
    element: <AuthPage />,
  },
  {
    path: links.client.product,
    element: <ProductDetailPage />,
  },
]

const panel_pages = [
  {
    isIndex: true,
    element: <PanelPage />,
  },
  {
    path: links.panel.profile,
    element: <MyProfile />,
    requireAdminRule: false,
  },
  {
    path: links.panel.users,
    element: <ProfileUsers />,
    requireAdminRule: true,
  },
  {
    path: links.panel.product,
    element : <ProfileProduct />,
    requireAdminRule: true,

  }
]
 
const App = () =>  {
  const isAuth = localStorage.getItem('token') ? true : false;
  const {user} = useContext(UserContext);
  console.log("user from context: ", user);
  

    return (
        <Routes>
            {client_pages.map((page) => (
                <Route key={page.path} path={page.path} element={page.element} />
            ))}
            {isAuth && (
                <Route path="/panel" element={<PanelLayout />}>
                  {
                    panel_pages.map((page) => {
                      if (page.isIndex) {
                        return (
                          <Route key='index-panel' index element={page.element} />
                        )
                      }
                      if (page.requireAdminRule) {
                        if (user?.isAdmin) {
                          return (
                            <Route key={page.path} path={page.path} element={page.element} />
                          )
                        } else {
                          return (
                            <Route key={page.path} path={page.path} element={<div>not authiorized app</div>} />
                          )
                        }
                      }
                      return (
                        <Route key={page.path} path={page.path} element={page.element} />
                      )
                    })
                  }
                </Route>
            )}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
    )
}

export default App

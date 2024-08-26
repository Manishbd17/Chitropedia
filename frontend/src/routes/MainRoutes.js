import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - sample page
const AlbumsPage = Loadable(lazy(() => import('pages/albums/AlbumPage')));
const AboutPage = Loadable(lazy(() => import('pages/staticPages/AboutPage'))); 
const AddAlbumPage = Loadable(lazy(() => import('pages/albums/AddAlbumPage'))); 
const ShowAlbumPage = Loadable(lazy(() => import('pages/albums/ShowAlbumPage'))); 
const UploadAlbumPage = Loadable(lazy(() => import('pages/albums/UploadAlbumPage'))); 
const EditAlbumPage = Loadable(lazy(() => import('pages/albums/EditAlbumPage')));
const PhotoEditPage =  Loadable(lazy(() => import('pages/albums/EditPhoto')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <AlbumsPage />
    },
    {
      path : '/albums/add', 
      element: <AddAlbumPage /> 
    }, 
    {
      path : '/albums/show', 
      element: <ShowAlbumPage /> 
    },
    {
      path : '/about', 
      element: <AboutPage /> 
    },
    {
      path: '/album/edit',
      element: <EditAlbumPage />
    },
    {
      path: '/photo/edit',
      element: <PhotoEditPage />
    },
    {
      path : '/albums/upload', 
      element: <UploadAlbumPage /> 
    }
  ]
};

export default MainRoutes;

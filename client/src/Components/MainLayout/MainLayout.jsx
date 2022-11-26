import React from 'react'
import { Layout } from "antd"
import { Outlet } from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer/Footer'

import "./mainlayout.scss"

const MainLayout = () => {
  return (
    <Layout>
      <Layout.Header className="Header">
        <Header />
      </Layout.Header>
      <Layout.Content className="Content">
        <Outlet />
      </Layout.Content>
      <Layout.Content className="Footer">
        <Footer />
      </Layout.Content>
    </Layout>
  )
}

export default MainLayout
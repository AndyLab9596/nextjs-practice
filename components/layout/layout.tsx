import React, { Fragment, ReactChild } from 'react'
import MainHeader from './mainHeader'

interface LayoutProps {
    children: ReactChild
}

const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <Fragment>
            <header>
                <MainHeader />
            </header>
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout
import React, {Component} from 'react';
import './Layout.css'
import MenuToggle from '../../components/navigation/menuToggle/menuToggle'
import Drawer from '../../components/navigation/Drawer/Drawer';
class Layout extends Component{

    state = {
        menuOpen: false        
    }

    toggleMenu = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }
    render(){
        return (
            <div >
                <Drawer
                    open={this.state.menuOpen}
                    onClose={this.toggleMenu}/>
                <MenuToggle
                        onToggle={this.toggleMenu}
                        isOpen={this.state.menuOpen}/>
                <main className="Layout">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;
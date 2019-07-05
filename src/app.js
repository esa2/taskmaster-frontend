import React from 'react';
import './app.scss';
import Header from './components/header'
import Tasks from './components/tasks'
import Footer from './components/footer'

function App() {
  return (

   <>
   <Header></Header>
   <main>
     <Tasks></Tasks>
   </main>
    <Footer></Footer>
   </>
   
  )
}

export default App;

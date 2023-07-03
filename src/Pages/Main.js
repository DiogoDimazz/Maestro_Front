import './styles.css';
import { Header } from '../Components/Header/Header'
import { MetronomeContainer } from '../Components/MetronomeContainer/MetronomeContainer';
import { SideDesigns } from '../Components/SideDesigns/SideDesigns';

function Main() {
  return (
    <main className='main'>
      <Header/>
      <div className='main-container'>
        <SideDesigns side={{left: '0rem'}}/>
        <MetronomeContainer/>
        <SideDesigns side={{right: '0rem'}}/>
      </div>
      {/* <RightContainer/> */}
    </main>
  );
}

export default Main;
